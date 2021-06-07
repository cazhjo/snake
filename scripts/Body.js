class Rect {
    constructor(size, x, y) {
        this.size = size
        this.x = x
        this.y = y
    }

    inBounds = (canvas) => {
        return (this.x >= 0) && (this.y <= canvas.height - this.size) && (this.x <= canvas.width - this.size) && (this.y >= 0)
    }

    intersectsWith = (rect) => {
        return ((this.x + this.size >= rect.x + 1) &&
            (this.y + this.size >= rect.y + 1) &&
            (this.x <= rect.x + rect.size - 1) &&
            (this.y <= rect.y + rect.size - 1))
    }
}

class Body extends Rect {
    constructor(size, x, y, direction) {
        super(size, x, y)
        this.direction = direction
    }

    changePosition = (otherDirection) => {
        if (this.direction != otherDirection) {
            if (this.x % 30 == 0 && this.y % 30 == 0) {
                this.direction = otherDirection
            }
        }
        if (this.direction == 'left')
            this.x--
        else if (this.direction == 'right')
            this.x++
        else if (this.direction == 'up')
            this.y--
        else
            this.y++
    }
}

class Food extends Rect {
    constructor(size) {
        super(size)
        this.setRandomPosition()
    }

    setRandomPosition = () => {
        this.x = getRndInteger(0, 20) * 30
        this.y = getRndInteger(0, 20) * 30
    }
}

const getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}