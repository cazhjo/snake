class Background {
    constructor(ctx, canvas) {
        this.ctx = ctx
        this.canvas = canvas
    }

    drawBackground = () => {
        let x = 0
        let y = 0
        let width = 30
        let height = 30
        let switchColor = true

        while (true) {
            this.ctx.fillStyle = switchColor ? '#00A547' : '#00B24D'
            this.ctx.fillRect(x, y, width, height)
            x += width
            if (x == this.canvas.width) {
                y += height
                x = 0
                switchColor = !switchColor
            }
            switchColor = !switchColor
            if (y == this.canvas.height) {
                break;
            }
        }
    }

    fillBlanks = (head, snake) => {
        for (let i = snake.length - 1; i >= 0; i--) {

            let previous = i == 0 ? head : snake[i - 1]
            
            let x, y
            let width = head.size, height = head.size
            
            if (previous.direction != snake[i].direction) {
                if (previous.direction == 'up' || previous.direction == 'down') {
                        x = previous.x
                        y = snake[i].y
                } else {
                    x = snake[i].x
                    y = previous.y
                }
            }
            this.ctx.fillStyle = '#004E75'
            this.ctx.fillRect(x, y, width, height)
        }
    }
}