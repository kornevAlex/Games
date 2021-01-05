function game() {
  const header = document.querySelector('.header')
  let name = document.querySelector('.inputName')
  const gameField = document.querySelector('.gameField')
  const timeToCheckbox = document.getElementById('checkbox').checked
  const btnRepeat = document.createElement('a')
  const gameOver = document.querySelector('.gameOver')
  const btnOver = document.querySelector('.over')
  const time = document.createElement('div')
  const congratulation = document.querySelector('.congratulation')
  const btnCongratulation = document.querySelector('.btnCongratulation')

  if (!gameOver.classList.contains('hide') || !congratulation.classList.contains('hide')) {
    gameOver.classList.add('hide')
    congratulation.classList.add('hide')
    document.querySelector('.time').innerHTML = ''
  }
  let s = 0
  let timer
  let playerName = name.value
  document.documentElement.style.setProperty('--grad', ' black');
  header.classList.add('hide')

  const countArr = () => {

    for (const el of document.querySelectorAll('.radioButton')) {

      if (el.checked) return Number(el.value)
    }
  }
  const count = countArr()

  function createArr(count) {
    const arr = []
    for (let i = 0; i < count / 2; i++) {

      for (let j = 0; j < 2; j++) {
        arr.push({ id: i + 1 })
      }
    }
    return arr
  }

  function render(array) {
    btnRepeat.classList.add('backinMenu')
    btnRepeat.innerHTML = `<i class = 'fa fa-reply-all fa-4x'><i/>`
    document.body.append(btnRepeat)

    array.sort(() => Math.random() - 0.5).map(el => {
      const cardContainer = document.createElement('div');
      const flipper = document.createElement('div');
      const front = document.createElement('div');
      const back = document.createElement('div');

      cardContainer.append(flipper)
      flipper.append(front, back)
      flipper.id = 'flip'
      cardContainer.classList.toggle('flip-container')
      flipper.classList.toggle('flipper')
      front.classList.toggle('front')
      back.classList.toggle('back')
      back.innerHTML = el.id


      if (count === 4) {
        cardContainer.style.width = `320px`
        flipper.style.width = `320px`
        front.style.width = `320px`
        back.style.width = `320px`
        back.style.fontSize = '100px'
      }

      if (count === 8) {
        cardContainer.style.width = `220px`
        flipper.style.width = `220px`
        front.style.width = `220px`
        back.style.width = `220px`
        back.style.fontSize = '80px'
      }

      if (count === 16) {
        cardContainer.style.width = `190px`
        flipper.style.width = `190px`
        front.style.width = `190px`
        back.style.width = `190px`
        back.style.fontSize = '60px'
      }

      if (count === 32) {
        cardContainer.style.width = `110px`
        front.style.width = `110px`
        flipper.style.width = `110px`
        back.style.width = `110px`
        back.style.fontSize = '40px'
      }
      cardContainer.style.height = `${1.1 * parseInt(cardContainer.style.width)}px`
      front.style.height = cardContainer.style.height
      back.style.height = cardContainer.style.height
      flipper.style.height = cardContainer.style.height
      gameField.append(cardContainer)

      flipper.addEventListener('click', () => {

        flipper.classList.add('active', 'add', 'gg')
        s++
        if (s === 2 || s > 2) {
          let arr = document.querySelectorAll('.add')
          if (arr[0].textContent === arr[1].textContent) {

          }
          else {
            setTimeout(() => {
              for (const i of arr) i.classList.remove('active', 'gg')
            }, 600)
          }
          s = 0
          for (const i of arr) i.classList.remove('add')
        }
        if (document.querySelectorAll('.gg').length === count) {
          clearInterval(timer)
          time.innerHTML = ''
          setTimeout(() => {
            document.querySelector('.congratulationName').innerHTML = `${playerName}, это было достойно! Сможешь выйграть ещё более сложный уровень?`
            congratulation.classList.remove('hide')

            gameField.innerHTML = ''
            btnRepeat.remove()
            let money = document.querySelector('.counts')
            timeToCheckbox ? (money.textContent = Number(money.textContent) + count * 5 * 2) : (money.textContent = Number(money.textContent) + count * 5)
          }, 1000)
        }
      })

    })
    gameField.classList.toggle('open')
  }

  if (timeToCheckbox) {
    let seconds = count * 2
    document.body.append(time)
    time.classList.add('time')
    timer = setInterval(() => {
      time.textContent = --seconds
      if (seconds === 0) {
        gameField.classList.toggle('hidesGame')
        gameField.classList.toggle('open')
        gameOver.classList.toggle('hide')
        gameField.innerHTML = ''
        btnRepeat.remove()
        clearInterval(timer)

      }
    }, 1000)
  }
  let arr = createArr(count)
  render(arr)

  btnRepeat.addEventListener('click', () => {
    gameField.innerHTML = ''
    header.classList.remove('hide')
    gameField.classList.toggle('open')
    gameField.classList.toggle('hidesGame')
    setTimeout(() => {
      document.documentElement.style.setProperty('--grad', ' linear-gradient(70deg, #ff520e, #ae63e4, #47cf73)')
    }, 300)
    btnRepeat.remove()
    clearInterval(timer)
    time.innerHTML = ''
  })

  function back() {
    header.classList.remove('hide')
    gameOver.classList.add('hide')
    congratulation.classList.add('hide')
    setTimeout(() => document.documentElement.style.setProperty('--grad', ' linear-gradient(70deg, #ff520e, #ae63e4, #47cf73)'), 300);
    btnRepeat.remove()
    clearInterval(timer)
    time.innerHTML = ''
  }

  btnOver.addEventListener('click', () => {
    back()
  })
  btnCongratulation.addEventListener('click', () => {
    console.log('da')
    back()
  })

}



