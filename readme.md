# MoonModal - гибкая библиотека модального окна

MoonModal - реализует гибкую и удобную работу
с модальными окнами. Все анимации построены на
`css transition`. Реализует смену модальных окон
по шагам. Можно легко вызывать модальные окна
последовательно, не трогая `overlay` и `scrollbar` для
плавной смены старых окон на новые

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
    selector: '[some-overlay-selector]' | HTMLElement,
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

## Возможное html представление

Библиотека не связывается жестко с модальными оконами
по их css селекторами. Вы можете иметь верстку основых
модальных окон, и уникальных, если для улучшения
качества кода, вы разбили некторые модальные окна
на новые `BEM` сущности

Еще это полезно, когда идет обновление старого проекта,
и необходимо реализовать связанную работу 
старых и новых модальных окон

```html
<div class="overlay"></div>

<div class="modal-wrapper" id="feedback">
  <div class="modal-content"><!-- content --></div>
</div>

<div class="modal-wrapper" id="ajax-info">
  <div class="modal-content"><!-- content --></div>
</div>

<div class="my-modal-old" id="calc">
  <div class="my-modal__body"><!-- content --></div>
</div>

<div class="my-modal-custom" id="card">
  <div class="modal-new-content"><!-- content --></div>
</div>
```

```js
import { MoonModal } from '@verno.digital/moon-modal'

const moonModal = new MoonModal({
  modal: {
    active: 'modal-wrapper--open',
    associated: {
      'my-modal-old': 'my-modal-old--active',
      'my-modal-custom': 'my-modal-custom--active'
    }
  },
  overlay: {
    selector: '.overlay',
    active: 'overlay--active'
  },
  timeout: 200
})

// Все методы описаны ниже
moonModal.open('#feedback')
```

## Конфигурация

**Активный класс - css класс отвечающий за показ/скрытие модального окна или оверлея*

### `modal.active`

```ts
interface modal {
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

### `overlay.el`

```ts
interface overlay {
  el: string | HTMLElement
}
```

Селектор или HTMLElement оверлея

### `overlay.active`

```ts
interface overlay {
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

Геттер с информацией об открытом модальном
окне, и о предыдущем

```ts
interface info {
  active: HTMLElement,
  prev: HTMLElement | undefined,
  timeout: number
}

const info: info = moonModal.info
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
```

```ts
interface info {
  current: HTMLElement,
  prev: HTMLElement | undefined
}

const info: info = moonModal.open('#feedback')
```

### `moonModal.close()`

Метод для закрытия модального окна

Возвоащает объект с информацией об открытом модальном
окне, и о предыдущем

```ts
moonModal.close()
```

```ts
interface info {
  current: HTMLElement
}

const info: info = moonModal.close()
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



## License

MIT
