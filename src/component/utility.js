function random(max, min = 0) {
    return Math.round(Math.random() * (max - min)) + min;
}

export const randomStroke = (context, shape) => {
    const pointNum = Math.max(context.canvas.width, context.canvas.height);
    for (let i = 0; i < pointNum; i++) {
        let x = random(context.canvas.width);
        let y = random(context.canvas.height);
        let width = random(5, 1);
        context.lineWidth = 1;
        switch (shape) {
            case 0:
                context.strokeRect(x - width, y - width, width * 2, width * 2);
                break;
            case 1:
                context.beginPath();
                context.arc(x, y, width, 0, 2 * Math.PI);
                context.stroke();
                break;

            default:
                context.strokeRect(x - width, y - width, width * 2, width * 2);
        }
    }
}