# 🛒 Automatización de pruebas para Éxito.com con Playwright

Este proyecto contiene pruebas automatizadas end-to-end para el sitio [Éxito.com](https://www.exito.com/), utilizando [Playwright](https://playwright.dev/).

## 📂 Estructura del proyecto

```
├── tests/
│   └── exito.spec.ts         # Archivo con pruebas del flujo de usuario
├── pageObject/
│   └── ExitoPage.ts          # Clase Page Object que modela las acciones sobre el sitio
├── playwright.config.ts      # Configuración de Playwright
├── package.json              # Dependencias y scripts
└── README.md                 # Documentación del proyecto
```

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/EdgarLemus/playwright-exito.git
cd playwright-exito
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Instalar los navegadores de Playwright

```bash
npx playwright install
```

### 4. Ejecutar las pruebas

```bash
npx playwright test
```

### 5. Ver el reporte HTML

```bash
npx playwright test --reporter=html
npx playwright show-report
```

## 🧪 Pruebas incluidas

Las pruebas automatizadas cubren los siguientes escenarios:

| Test                                                   | Descripción                                                                 |
|--------------------------------------------------------|-----------------------------------------------------------------------------|
| Buscar producto                                        | Realiza una búsqueda de un producto específico.                            |
| Agregar producto al carrito                            | Busca un producto y lo agrega al carrito.                                  |
| Eliminar producto del carrito                          | Elimina el producto previamente agregado al carrito.                        |
| Verificación de cantidad reflejada en el checkout      | Aumenta la cantidad del producto y valida el resumen del carrito.          |
| Validación de resumen de checkout con carrito vacío    | Navega al resumen de compra con el carrito vacío y valida el mensaje.      |
| Confirmación de eliminación desde minicart             | Elimina un producto desde el minicart y valida su ausencia en checkout.    |

## 🧱 Uso del patrón Page Object

Este proyecto aplica el patrón **Page Object Model (POM)**.  
La clase `ExitoPage.ts` abstrae las acciones comunes del sitio como:

- Búsqueda de productos
- Agregar/eliminar productos
- Navegación al carrito y checkout
- Validaciones de contenido visible

Esto permite mantener el código limpio, reutilizable y fácil de mantener.

## 🧩 Tecnologías usadas

- **Playwright** para automatización de pruebas.
- **TypeScript** para tipado estático y organización.
- **Jest (expect)** incluido con Playwright para aserciones.

## ✅ Buenas prácticas implementadas

- Uso del patrón Page Object para organizar interacciones.
- Esperas explícitas (`waitFor`) en lugar de timeouts innecesarios.
- Separación entre lógica de prueba (`spec`) y lógica de página (`pageObject`).

## 📜 Scripts útiles (`package.json`)

Puedes agregar lo siguiente en tu `package.json` para facilitar la ejecución:

```json
"scripts": {
  "test": "playwright test",
  "test:report": "playwright test --reporter=html",
  "show-report": "playwright show-report"
}
```

## 📸 Capturas (opcional)

Puedes incluir capturas del reporte HTML o interfaz de checkout para enriquecer la documentación.

## 📬 Contacto

Proyecto desarrollado por Edgar Duvan Lemus Ramos.  
¿Preguntas o sugerencias? [edgar_duvan_l_@hotmail.com]
