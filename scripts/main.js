const main = () => {
    const canvas = document.getElementById('game-canvas')
    const ctx = canvas.getContext('2d')
    let style = document.createElement('style')
        
    let score = 0
    let snake = new Snake(new Body(30, 300, 300, 'left'))
    let food = new Food(snake.head.size)
    let background = new Background(ctx, canvas)

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
        localStorage.setItem('highscore', currentHighscore)
        document.getElementById('highscore').innerText = currentHighscore
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
        document.getElementById('info-container').style.opacity = '1'
        let playButton = document.getElementById('play')
        let css = '#play:hover{ cursor: pointer; transform: scale(1.1);}'
        
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        document.getElementsByTagName('head')[0].appendChild(style)
        playButton.onclick = (e) => {restart()}
    }

    const draw = () => {
        if (snake.head.inBounds(canvas)) {
            snake.changeHeadPosition()
        } else {
            gameOver()
            return
        }

        if (snake.head.intersectsWith(food)) {
            score ++
            food.setRandomPosition()
            snake.addBody()

        }
        background.drawBackground()

        ctx.fillStyle = '#B25300'
        ctx.fillRect(food.x, food.y, food.size, food.size)

        ctx.fillStyle = '#004E75'
        ctx.fillRect(snake.head.x, snake.head.y, snake.head.size, snake.head.size)

        if (snake.snake.length > 0) {
            snake.changeBody()
            for (const body of snake.snake) {
                ctx.fillStyle = '#004E75'
                ctx.fillRect(body.x, body.y, body.size, body.size)
            }

            for (const body of snake.snake.slice(1)) {
                if (snake.head.intersectsWith(body)) {
                    gameOver()
                }
            }

            background.fillBlanks(snake.head, snake.snake)
        }

    }

    let gameClock = setInterval(draw, 5)
}




window.onload = main
