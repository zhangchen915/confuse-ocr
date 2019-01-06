function random(max, min = 0) {
    return Math.round(Math.random() * (max - min)) + min;
}

export const randomPoint = (context) => {
    console.log(context)
    for (let i = 0; i < 100; i++) {
        let x = random(context.canvas.width);
        let y = random(context.canvas.height);
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + 1, y + 1);
        context.closePath();
        context.stroke();
    }
}