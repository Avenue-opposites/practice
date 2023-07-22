const paths = document.querySelectorAll('.animate')

for (const path of paths) {
  const length = ~~path.getTotalLength() + 1
  path.style.setProperty('--length', length)
}
