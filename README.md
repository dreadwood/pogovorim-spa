# Pogovorim

```jsx
import clsx from 'clsx'
import styles from './$.module.scss'

interface $Props {
  className?: string
}

export default function $({ className }: $Props): JSX.Element {
  return (
    <div className={clsx(styles.wrp, className)}>

    </div>
  )
}
```

```jsx
<div className={styles.wrp}></div>
```

```scss
@import '@style/common';
```
