interface SpriteProps {
  name: string
  width?: string
  height?: string
}

function Sprite({ name, width, height }: SpriteProps): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width}
      height={height}
    >
      <use xlinkHref={`/assets/sprite.svg#${name}`} />
    </svg>
  )
}

export default Sprite
