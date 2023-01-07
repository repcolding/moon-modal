# MoonModal - Гибкая библиотека модального окна

MoonModal - библиотека для работы с модальными окнами.
Позваляет настраивать шаги из модальных окон
и имеет гибкую настройку под каждый кейс

## Установка

```shell
# Через npm
npm i @verno.digital/moon-modal

# Через yarn
yarn add @verno.digital/moon-modal
```

## Использование

```js
import { MoonModal } from '@verno.digital/moon-modal'

const moonModal = new MoonModal({
  modal: {
    active: 'some-active-class',
    associated: {
      'some-modal-class-a': 'some-class-a--active',
      'some-modal-class-b': 'some-class-b--active',
      'some-modal-class-c': 'some-class-c--active'
    }
  },
  overlay: {
    selector: '[css-selector]',
    active: 'some-overlay-class--active'
  },
  timeout: 200
})

// Методы
moonModal.initOuterClose()

moonModal.open('#som-id')
moonModal.close()

moonModal.timeout = 280

moonModal.addModifierOverlay('some-class')
moonModal.removeModifierOverlay('some-class')

moonModal.destroy()
```

## Конфигурация

**Активный класс - css класс отвечающий за показ/скрытие модального окна или оверлея*

### `modal.active`

```ts
modal: {
  active: string
}
```

Активынй класс для модального окна.
Используется по умолчанию

Если в `modal.associated` будет найден подходящий класс,
то данный параметр будет проигнорирован

Пример:

```html
<div class="modal" id="ajax-successful" />
<div class="library-modal" id="calc" />
```

```js
const moonModal = new MoonModal({
  modal: {
    active: '--active-class-modal'
  }
  // ...
})
```

***

```js
moonModal.open('#ajax-successful')
```

```html
<div class="modal --active-class-modal" id="ajax-successful" />
```

***

```js
moonModal.open('#calc')
```

```html
<div class="library-modal --active-class-modal" id="ajax-error" />
```

### `modal.associated`

```ts
interface associated {
  [searchClass: string]: [activeClass: string],
  [searchClass: string]: [activeClass: string],
  [searchClass: string]: [activeClass: string]
  // ...
}

modal: {
  associated: associated
}
```

Объект для точечного указания активного класса,
разным модальным окнам

Если не будет найдено необходимое значение,
будет использован активный класс из `modal.active`

Пример:

```html
<div class="info-modal" id="successful" />
<div class="custom-modal" id="error" />
<div class="modal" id="feedback" />
```

```js
const moonModal = new MoonModal({
  modal: {
    active: 'modal--open',
    associated: {
      'info-modal': 'info-modal--open',
      'custom-modal': 'custom-modal--show'
    }
  }
  // ...
})
```

***

```js
moonModal.open('#successful')
```

```html
<div class="info-modal info-modal--open" id="successful" />
```

***

```js
moonModal.open('#error')
```

```html
<div class="custom-modal custom-modal--show" id="error" />
```

***

```js
moonModal.open('#feedback')
```

```html
<div class="modal modal--open" id="feedback" />
```

### `overlay.selector`

```ts
overlay: {
  el: string | HTMLElement
}
```

Селектор или HTMLElement оверлея

### `overlay.active`

```ts
overlay: {
  active: string
}
```

Активный класс для оверлея


### `timeout`

Время в ms, за котрое выполняется анимация

## Методы и свойства

```ts
const moonModal = new MoonModal({/* options */})
```

### `moonModal.info`

Свойство с информацией об открытом модальном
окне, и о предыдущем

```ts
moonModal.info.prev = HTMLElement | undefined
moonModal.info.active = HTMLElement
```

### `moonModal.open(string | HTMLElement)`

Метод для открытия модального окна. Принимает селектор,
по которому нужно найти модальное окно, или `HTMLElement`

Возвоащает объект с информацией об открытом модальном
окне, и о предыдущем

```ts
const modalElement = document.querySelector('#feedback')

moonModal.open('#feedback') // Первый вариант
moonModal.open(modalElement) // Второй вариант

const info = moonModal.open('#feedback')

info.prev = HTMLElement | undefined
info.active = HTMLElement
```

### `moonModal.close()`

Метод для закрытия модального окна

Возвоащает объект с информацией об открытом модальном
окне, и о предыдущем

```ts
const info = moonModal.close()

info.prev = HTMLElement | undefined
info.active = HTMLElement
```

### `moonModal.addModifierOverlay(string)`

Добавление класса на оверлей, который был получен
при инициализации

```ts
moonModal.addModifierOverlay('my-overlay--open')
```

### `moonModal.removeModifierOverlay()`

Метод для удаления класса на оверлее, который был получен
при инициализации

```ts
moonModal.removeModifierOverlay('my-overlay--open')
```

### `moonModal.initOuterClose()`

Метод для добавление eventListener, для отслеживание
клика за пределы контента модального окна, для закртия

```ts
moonModal.initOuterClose()
```

### `moonModal.destroy()`

Метод для очистка eventListener,
для удаления instants`а

```ts
moonModal.destroy()
```

### `moonModal.timeout`

Сеттер для установки времени анимации, если необходимо
изменить время динамически, после инициализации

```ts
moonModal.timeout = 400
```
