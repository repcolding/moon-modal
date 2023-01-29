# moon modal

Реализация модальных окон, с анимацией
через `css transition`, подходит для решения
любых задач связанными с модальными окнами

***Локальный модуль verno.digital***

## Установка

```shell
# Через npm
npm i @verno.digital/moon-modal

# Через yarn
yarn add @verno.digital/moon-modal
```

## Использование

```ts
import { MoonModal } from '@verno.digital/moon-modal'

const modalFeedback = document.querySelector('#feedback')

const moonModal = new MoonModal({
  modal: {
    active: 'modal--open'
  },
  overlay: {
    el: '.overlay',
    active: 'overlay--active'
  },
  timeout: 200
})

// Основыне методы
moonModal.open(modalFeedback)
moonModal.close()

// ---

moonModal.open('#feedback')
moonModal.close()
```

## Настройки

```ts
interface options {
  modal: {
    active: string,
    associated?: object
  },
  overlay: {
    el: string | HTMLElement,
    active: string
  },
  timeout: number,
  dispatch?: {
    open?: {
      start?: string,
      transitionEnd?: string
    },
    close?: {
      start?: string,
      transitionEnd?: string
    }
  },
  cssVars?: {
    sizeScrollBar?: string
  }
}
```

## License

MIT
