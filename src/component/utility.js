function random(max, min = 0) {
    return Math.round(Math.random() * (max - min)) + min;
}

export const randomStroke = (context, shape) => {
    console.log(shape)
    const pointNum = Math.max(context.canvas.width, context.canvas.height);
    for (let i = 0; i < pointNum; i++) {
        let x = random(context.canvas.width);
        let y = random(context.canvas.height);
        let width = random(5, 1);
        context.lineWidth = 1;
        switch (shape) {
            case 1:
                context.strokeRect(x - width, y - width, width * 2, width * 2);
                break;
            case 2:
                context.beginPath();
                context.arc(x, y, width, 0, 2 * Math.PI);
                context.stroke();
                break;
            case 3:
                if (width > 2) {
                    context.lineWidth = .5;
                    context.beginPath();
                    context.moveTo(x, y);
                    context.lineTo(x + random(100), y + random(100));
                    context.closePath();
                    context.stroke();
                }
                break;
            case 4:
                if (width > 2) {
                    // context.lineWidth = .5;
                    context.beginPath();
                    context.setLineDash([5, 15]);
                    context.moveTo(x, y);
                    context.lineTo(x + random(100), y + random(100));
                    context.closePath();
                    context.stroke();
                }
                break;
            default:
                context.strokeRect(x - width, y - width, width * 2, width * 2);
        }
    }
}