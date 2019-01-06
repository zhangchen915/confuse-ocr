import { h, Component } from 'preact';
import { withText, Text } from 'preact-i18n';
import rasterizeHTML from 'rasterizehtml';
import Editor from './editer';

import { randomPoint } from './component/utility'

export default class App extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    componentDidMount() {
        this.ctx = this.canvas.getContext("2d");
    }

    convert = (editer) => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = editer.getBounds(editer.getLength()).bottom + 10;

        rasterizeHTML.drawHTML(editer.root.innerHTML).then(res => {
            
            randomPoint(this.ctx)
            this.ctx.drawImage(res.image, 0, 0);
        })
    }

    render() {
        return (<div className="">
            <Editor convert={this.convert} />

            <canvas ref={e => this.canvas = e}></canvas>
        </div>);
    }
}