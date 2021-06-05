const main = () => {
    const canvas = document.getElementById('game-canvas')
    const ctx = canvas.getContext('2d')
    let style = document.createElement('style')
    let nextDirection = ''
    let snake = {
        size: 30,
        x: 300,
        y: 300,
        direction: 'left'
    }

    let snakeBody = []
    let score = 0
    console.log(snake.x)
    console.log(snake.y)
    let food = {
        size: snake.size
    }

    const getRndInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    const inBounds = () => {
        return (snake.x >= 0) && (snake.y <= canvas.height - snake.size) && (snake.x <= canvas.width - snake.size) && (snake.y >= 0)
    }

    const changePosition = (body, otherDirection) => {
        if (body.direction != otherDirection) {
            if (body.x % 30 == 0 && body.y % 30 == 0) {
                body.direction = otherDirection
                // console.log(body.x + ' : ' + body.y)
            }
        }


        if (body.direction == 'left')
            body.x--
        else if (body.direction == 'right')
            body.x++
        else if (body.direction == 'up')
            body.y--
        else
            body.y++
    }

    const doesRectIntersect = (rect1, rect2) => {
        return ((rect1.x + rect1.size >= rect2.x + 1) &&
            (rect1.y + rect1.size >= rect2.y + 1) &&
            (rect1.x <= rect2.x + rect2.size - 1) &&
            (rect1.y <= rect2.y + rect2.size - 1))
    }

    const changeFood = () => {
        food.x = getRndInteger(0, 20) * 30
        food.y = getRndInteger(0, 20) * 30
    }

    const addBody = () => {
        let previousBody
        let newBody = {
            size: snake.size,
            x: 0,
            y: 0,
            direction: ''
        }

        if (snakeBody.length == 0)
            previousBody = Object.assign({}, snake)
        else
            previousBody = Object.assign({}, snakeBody[snakeBody.length - 1])

        newBody.direction = previousBody.direction
        if (previousBody.direction == 'up') {

            newBody.x = previousBody.x
            newBody.y = previousBody.y + snake.size
        }
        else if (previousBody.direction == 'right') {
            newBody.x = previousBody.x - snake.size
            newBody.y = previousBody.y
        }
        else if (previousBody.direction == 'down') {
            newBody.x = previousBody.x
            newBody.y = previousBody.y - snake.size
        }
        else {
            newBody.x = previousBody.x + snake.size
            newBody.y = previousBody.y
        }
        snakeBody.push(newBody)
    }

    const changeSnakeBody = () => {
        for (let i = snakeBody.length - 1; i >= 0; i--) {

            let previous
            if (i == 0) {
                previous = Object.assign({}, snake)
            }
            else
                previous = Object.assign({}, snakeBody[i - 1])
            changePosition(snakeBody[i], previous.direction)
        }
    }

    const fillBlanks = () => {
        for (let i = snakeBody.length - 1; i >= 0; i--) {

            let previous
            if (i == 0) {
                previous = Object.assign({}, snake)
            }
            else
                previous = Object.assign({}, snakeBody[i - 1])
            
            let x, y
            let width = snake.size, height = snake.size
            
            if (previous.direction != snakeBody[i].direction) {
                if (previous.direction == 'up' || previous.direction == 'down') {
                        x = previous.x
                        y = snakeBody[i].y
                } else {
                    x = snakeBody[i].x
                    y = previous.y
                }
            }
            ctx.fillStyle = '#004E75'
            ctx.fillRect(x, y, width, height)
        }
    }

    const createPattern = () => {
        let x = 0
        let y = 0
        let width = 30
        let height = 30
        let switchColor = true

        while (true) {
            ctx.fillStyle = switchColor ? '#00A547' : '#00B24D'
            ctx.fillRect(x, y, width, height)
            x += width
            if (x == canvas.width) {
                y += height
                x = 0
                switchColor = !switchColor
            }
            switchColor = !switchColor
            if (y == canvas.height) {
                break;
            }
        }
    }

    const restart = () => {
        score = 0
        let playButton = document.getElementById('play')
        document.getElementsByTagName('head')[0].removeChild(style)
        playButton.onclick = (e) => {}
        let overlay = document.getElementById('game-over')
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)'
        document.getElementById('info-container').style.opacity = '0'
        main()
    }

    const gameOver = () => {
        clearInterval(gameClock)
        let overlay = document.getElementById('game-over')
        document.getElementById('score').innerText = score
        let currentHighscore = localStorage.getItem('highscore') || 0
        if (score > +currentHighscore) {
            currentHighscore = score
        }
        console.log(score)
        localStorage.setItem('highscore', currentHighscore)
        document.getElementById('highscore').innerText = currentHighscore
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
        document.getElementById('info-container').style.opacity = '1'
        let playButton = document.getElementById('play')
        let css = '#play:hover{ cursor: pointer; transform: scale(1.1);}'
        // let style = document.createElement('style')
        
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        document.getElementsByTagName('head')[0].appendChild(style)
        playButton.onclick = (e) => {restart()}
    }

    const draw = () => {
        if (inBounds()) {
            changePosition(snake, nextDirection)
        } else {
            gameOver()
            return
        }

        if (doesRectIntersect(snake, food)) {
            // console.log((snake.x + snake.size) + " : " + food.x)
            score ++
            changeFood()
            addBody()

        }
        createPattern()

        ctx.fillStyle = '#B25300'
        ctx.fillRect(food.x, food.y, food.size, food.size)

        ctx.fillStyle = '#004E75'
        ctx.fillRect(snake.x, snake.y, snake.size, snake.size)

        if (snakeBody.length > 0) {
            changeSnakeBody()
            for (const body of snakeBody) {
                ctx.fillStyle = '#004E75'
                ctx.fillRect(body.x, body.y, body.size, body.size)
            }

            for (const body of snakeBody.slice(1)) {
                if (doesRectIntersect(snake, body)) {
                    // console.log(snake.x + ' : ' + snake.y)
                    // console.log(body.x + ' : ' + body.y)
                    gameOver()
                }
            }

            fillBlanks()
        }

    }

    window.addEventListener('keydown', (e) => {
        key = e.key
        if (key == 'ArrowLeft' && snake.direction != 'right')
            nextDirection = 'left'
        else if (key == 'ArrowUp' && snake.direction != 'down')
            nextDirection = 'up'
        else if (key == 'ArrowRight' &&  snake.direction != 'left')
            nextDirection = 'right'
        else if (key == 'ArrowDown' && snake.direction != 'up')
            nextDirection = 'down'
    })

    changeFood()
    let gameClock = setInterval(draw, 5)
}




window.onload = main
