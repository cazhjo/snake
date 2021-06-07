class Snake {
    snake = []
    nextDirection
    constructor(head) {
        this.head = head
        this.keyListener()
    }

    keyListener = () => {
        window.addEventListener('keydown', (e) => {
            let key = e.key
            if (key == 'ArrowLeft' && this.head.direction != 'right')
                this.nextDirection = 'left'
            else if (key == 'ArrowUp' && this.head.direction != 'down')
                this.nextDirection = 'up'
            else if (key == 'ArrowRight' &&  this.head.direction != 'left')
                this.nextDirection = 'right'
            else if (key == 'ArrowDown' && this.head.direction != 'up')
                this.nextDirection = 'down'
        })
    }

    addBody = () => {
        let previousBody = this.snake.length == 0 ? this.head : this.snake[this.snake.length - 1]
        let newBody = new Body(this.head.size, 0, 0, '')

        newBody.direction = previousBody.direction
        if (previousBody.direction == 'up') {

            newBody.x = previousBody.x
            newBody.y = previousBody.y + this.head.size
        }
        else if (previousBody.direction == 'right') {
            newBody.x = previousBody.x - this.head.size
            newBody.y = previousBody.y
        }
        else if (previousBody.direction == 'down') {
            newBody.x = previousBody.x
            newBody.y = previousBody.y - this.head.size
        }
        else {
            newBody.x = previousBody.x + this.head.size
            newBody.y = previousBody.y
        }
        this.snake.push(newBody)
    }

    changeBody = () => {
        for (let i = this.snake.length - 1; i >= 0; i--) {
            let previousDirection = i == 0 ? this.head.direction : this.snake[i - 1].direction
            this.snake[i].changePosition(previousDirection)
        }
    }

    changeHeadPosition = () => this.head.changePosition(this.nextDirection)
}