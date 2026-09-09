# Pokedexia 📱🔴

Pokedexia es una Pokédex para móvil construida con **Expo** y **React Native**, pensada para consultar información completa y detallada de cada Pokémon (datos, movimientos, evoluciones, localizaciones, objetos y más) usando la [PokéAPI](https://pokeapi.co/) como fuente de datos y **SQLite** para almacenamiento/caché local.

## Stack

- [Expo](https://docs.expo.dev/versions/v57.0.0/) (SDK 57) + Expo Router
- React Native 0.86
- SQLite (persistencia y caché local)
- [PokéAPI](https://pokeapi.co/) (datos de Pokémon)

> ⚠️ Este proyecto usa Expo SDK 57, cuya API cambió respecto a versiones anteriores. Antes de escribir o modificar código, consulta la documentación versionada: https://docs.expo.dev/versions/v57.0.0/

## Empezando

### Requisitos previos

- [Node.js](https://nodejs.org/) 18 o superior
- [pnpm](https://pnpm.io/)
- La app [Expo Go](https://expo.dev/go) en tu móvil, o un emulador de Android/iOS configurado

### Instalación y arranque

1. Instala las dependencias:

   ```bash
   pnpm install
   ```

2. Inicia el servidor de desarrollo:

   ```bash
   pnpm start
   ```

3. Desde la terminal de Expo puedes abrir el proyecto en:

   - **Expo Go** (escaneando el QR con tu móvil)
   - Un [build de desarrollo](https://docs.expo.dev/develop/development-builds/introduction/)
   - Un [emulador de Android](https://docs.expo.dev/workflow/android-studio-emulator/)
   - Un [simulador de iOS](https://docs.expo.dev/workflow/ios-simulator/)

### Scripts disponibles

| Comando              | Descripción                                  |
| --------------------- | --------------------------------------------- |
| `pnpm start`           | Inicia el servidor de desarrollo de Expo      |
| `pnpm android`         | Abre la app en un emulador/dispositivo Android |
| `pnpm ios`             | Abre la app en un simulador/dispositivo iOS   |
| `pnpm web`             | Abre la app en el navegador                   |
| `pnpm lint`            | Ejecuta el linter del proyecto                |
| `pnpm reset-project`   | Mueve el código de ejemplo a `app-example` y deja `src/app` en blanco |

## Funcionalidades principales

- **Ficha completa de cada Pokémon**: sprite, tipos, habilidades (incluyendo ocultas), línea evolutiva con sus requisitos, descripción de la Pokédex, peso, altura, movimientos, generación, número de Pokédex y estadísticas base.
- **Fortalezas y debilidades**: tabla de efectividad por tipo, incluyendo los multiplicadores de daño (x2, x4, x0.5, x0, etc.).
- **Tabla de tipos**: efectividad de ataque/defensa entre todos los tipos.
- **Movimientos y habilidades**: qué Pokémon pueden aprenderlos y bajo qué requisitos (nivel, MT, crianza, tutor...).
- **Localización por región**: dónde encontrar cada Pokémon en cada juego/región.
- **Detalle de movimientos**: categoría (físico, especial, estado), tipo, poder, precisión, PP, etc.
- **Filtro por generación**: en la ficha de cada Pokémon, para ver cómo cambian sus datos a través de las generaciones.
- **Calculadora de estadísticas**: cálculo de estadísticas y su evolución por nivel según la naturaleza del Pokémon.
- **Localización de objetos**: dónde encontrar cada objeto según el juego y la generación.

## Estructura del proyecto

```
src/
├── app/            # Rutas de la app (Expo Router)
├── components/     # Componentes reutilizables de UI
├── constants/      # Constantes (tema, colores, etc.)
└── hooks/          # Hooks personalizados
```

Este proyecto usa [file-based routing](https://docs.expo.dev/router/introduction/) con Expo Router: cada archivo dentro de `src/app` se convierte automáticamente en una pantalla.

## Estado del proyecto

🚧 En desarrollo activo. La estructura base de Expo Router ya está lista; las funcionalidades de la Pokédex descritas arriba forman la hoja de ruta del proyecto.

## Más información

- [Documentación de Expo (v57)](https://docs.expo.dev/versions/v57.0.0/)
- [Documentación de Expo Router](https://docs.expo.dev/router/introduction/)
- [PokéAPI](https://pokeapi.co/docs/v2)
