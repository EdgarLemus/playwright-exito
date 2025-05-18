import { Locator, TestInfo, expect, type Page } from '@playwright/test';
import { assert } from 'console';

export class ExitoPage {

    private inputBusqueda: Locator;
    private txtProducto: Locator;
    private txtNombreProducto: Locator;
    private page: Page;
    private btnAgregarCarrito: Locator;
    private btnIrAlCarrito: Locator;
    private btnSeguirComprando: Locator;
    private btnVerCarrito: Locator;
    private btnVerCarritoIrAPagar: Locator;
    private btnElmiminarProducto: Locator;
    private txtNombreProductoCarrito: Locator;
    private txtNoProductoCarrito: Locator;
    private nombreProducto: string;
    private nombreProductoCarrito: string;
    private inputCantidad: Locator;
    private btnAumentarCantidad: Locator;
    private testInfo: TestInfo;
    private cantidad: number;
    private txtCantidadResumen: Locator;
    private btnAceptarCookies: Locator;
    private txtCarritoVacioResumen: Locator;
    private btnCerrarModal: Locator;

    constructor(page: Page, testInfo: TestInfo) {
        this.page = page;
        this.testInfo = testInfo;
        this.inputBusqueda = page.locator('//input[contains(@placeholder,\'Buscar\')]');
        this.txtProducto = page.locator('//h3[contains(text(),\'Televisor SAMSUNG 60 pulgadas LED Uhd4K Smart TV UN60DU7000KXZL\')]//parent::a');
        this.txtNombreProducto = page.locator('//h5[contains(text(),\'Televisor SAMSUNG 60 pulgadas LED Uhd4K Smart TV UN60DU7000KXZL\')]');
        this.btnAgregarCarrito = page.locator('//div[@data-fs-container-buybutton]//span[text()=\'Agregar\']//parent::button');
        this.btnIrAlCarrito = page.locator('//span[text()=\'Ir al carrito\']//parent::button');
        this.btnSeguirComprando = page.locator('//div[@data-fs-warranty-footer]//button[contains(text(),\'Seguir\')]');
        this.btnVerCarrito = page.locator('//span[text()=\'Carrito\']//parent::button');
        this.btnElmiminarProducto = page.locator('(//div[@data-fs-product-container]//button)[1]');
        this.txtNombreProductoCarrito = page.locator('//div[@data-fs-product-container]//p[@data-fs-product-name]');
        this.txtNoProductoCarrito = page.locator('//p[contains(text(),\'No tienes\')]');
        this.btnVerCarritoIrAPagar = page.locator('//button[contains(text(),\'Ver carrito\')]');
        this.inputCantidad = page.locator('//li//input[contains(@class,\'QuantitySelectorDefault\')]');
        this.cantidad = Math.floor(Math.random() * 5);
        this.btnAumentarCantidad = page.locator('(//div[@data-fs-product-container]//button)[2]');
        this.btnAceptarCookies = page.locator('//button[text()=\'Acepto\']');
        this.txtCantidadResumen = page.locator('//span[@data-molecule-quantity-und-value]');
        this.txtCarritoVacioResumen = page.locator('//h1[contains(text(),\'vacío\')]');
        this.btnCerrarModal = page.locator('//header[@data-fs-modal-exito-headermodal]//button');
    }

    async buscarProducto(producto: string) {
        await this.cerrarModal();
        await this.inputBusqueda.waitFor({ state: 'visible' });
        await this.inputBusqueda.fill(producto);        
        await this.page.keyboard.press('Enter');
        await this.txtProducto.click();

        expect(this.txtNombreProducto).toBeVisible({ timeout: 5000 });
        this.nombreProducto = await this.txtNombreProducto.innerText();
        console.log('Nombre del producto:', this.nombreProducto);
    }

    async cerrarModal() {
        if (await this.btnCerrarModal.isVisible()) {
            await this.btnCerrarModal.click();
        }
    }

    async agregarAlCarrito() {
        await this.btnAgregarCarrito.click();
        if (await this.btnSeguirComprando.isVisible()) {
            await this.btnSeguirComprando.click();
        }
        await this.verCarrito();

        expect(this.txtNombreProductoCarrito).toBeVisible({ timeout: 5000 });
        this.nombreProductoCarrito = await this.txtNombreProductoCarrito.innerText();
        console.log('Nombre del producto en el carrito:', this.nombreProductoCarrito);

        expect(this.nombreProducto).toEqual(this.nombreProductoCarrito);
        console.log('El producto agregado al carrito es el mismo que el buscado.');
    }

    async verCarrito() {
        await this.cerrarModal();
        await this.btnVerCarrito.click();
    }

    async eliminarProductoCarrito() {
        await this.btnElmiminarProducto.click();
        const mensaje = await this.txtNoProductoCarrito.innerText();
        expect(this.txtNoProductoCarrito).toBeVisible({ timeout: 5000 });
        console.log('El producto ha sido eliminado del carrito.');
    }

    async aumentarCantidad() {
        await this.btnAumentarCantidad.waitFor({ state: 'visible' });
        for (let i = 0; i < this.cantidad; i++) {
            await this.btnAumentarCantidad.click();
            await this.inputCantidad.waitFor({ state: 'visible' });
        }
    }

    async verificarCantidadCarrito() {
        await this.txtCantidadResumen.waitFor({ state: 'visible' });
        const cantidadResumen = await this.txtCantidadResumen.innerText();
        console.log('Cantidad en el resumen de checkout:', cantidadResumen);
        console.log('Cantidad esperada:', this.cantidad);
        expect(Number(cantidadResumen)).toEqual(this.cantidad + 1);
    }

    async verificarCarritoVacioEnResumen() {
        await this.txtCarritoVacioResumen.waitFor({ state: 'visible' });
        const mensaje = await this.txtCarritoVacioResumen.innerText();
        expect(this.txtCarritoVacioResumen).toBeVisible({ timeout: 5000 });
        console.log(mensaje);
    }

    async irAPagar() {
        if (await this.btnAceptarCookies.isVisible()) {
            await this.btnAceptarCookies.click();
        }
        await this.btnVerCarritoIrAPagar.waitFor({ state: 'visible' });
        await this.btnVerCarritoIrAPagar.click();
        await this.page.waitForTimeout(5000);
    }
}