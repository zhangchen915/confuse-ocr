function random(max, min = 0) {
    return Math.round(Math.random() * (max - min)) + min;
}

export const randomStroke = (context) => {
    const pointNum = Math.min(context.canvas.width, context.canvas.height) * 2;
    for (let i = 0; i < pointNum; i++) {
        let x = random(context.canvas.width);
        let y = random(context.canvas.height);
        let width = random(4, 1);
        context.lineWidth = 1;
        context.strokeRect(x - width, y - width, width * 2, width * 2);
    }
}