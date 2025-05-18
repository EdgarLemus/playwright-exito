import { test, expect, type Page } from '@playwright/test';
import { ExitoPage } from '../pageObject/ExitoPage';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Pruebas de Exito', () => {
    let urlExito = 'https://www.exito.com/';

    test.beforeEach(async ({ page }) => {
        await page.goto(urlExito);
    });

    test('Buscar producto', async ({ page }, testInfo) => {
        const exitoPage = new ExitoPage(page, testInfo);
        await exitoPage.buscarProducto('televisor');
    });

    test('Agregar producto al carrito', async ({ page }, testInfo) => {
        const exitoPage = new ExitoPage(page, testInfo);
        await exitoPage.buscarProducto('televisor');
        await exitoPage.agregarAlCarrito();
    });

    test('Eliminar producto del carrito', async ({ page }, testInfo) => {
        const exitoPage = new ExitoPage(page, testInfo);
        await exitoPage.buscarProducto('televisor');
        await exitoPage.agregarAlCarrito();
        await exitoPage.eliminarProductoCarrito();
    });

    test('Verificación de cantidad agregada al carrito reflejada en el resumen de checkout', async ({ page }, testInfo) => {
        const exitoPage = new ExitoPage(page, testInfo);
        await exitoPage.buscarProducto('televisor');
        await exitoPage.agregarAlCarrito();
        await exitoPage.aumentarCantidad();
        await exitoPage.irAPagar();
        await exitoPage.verificarCantidadCarrito();
    });

    test('Validación de resumen de checkout sin productos cuando el carrito está vacío', async ({ page }, testInfo) => {
        const exitoPage = new ExitoPage(page, testInfo);
        await exitoPage.verCarrito();
        await exitoPage.irAPagar();
        await exitoPage.verificarCarritoVacioEnResumen();
    });

    test('Confirmación de eliminación de producto desde minicart y su ausencia en el checkout', async ({ page }, testInfo) => {
        const exitoPage = new ExitoPage(page, testInfo);
        await exitoPage.buscarProducto('televisor');
        await exitoPage.agregarAlCarrito();
        await exitoPage.eliminarProductoCarrito();
        await exitoPage.irAPagar();
        await exitoPage.verificarCarritoVacioEnResumen();
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });
});