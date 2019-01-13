import { h, Component } from 'preact';
import { withText, Text } from 'preact-i18n';
import Snackbar from 'preact-material-components/Snackbar';
import domtoimage from 'dom-to-image';

import Editor from './editer';
import { randomStroke } from './component/utility'

export default class App extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    componentDidMount() {
        this.img = new Image();
        this.ctx = this.canvas.getContext("2d");
        this.img.onload = () => {
            this.ctx.drawImage(this.img, 0, 0);
        }
    }

    convert = (editer) => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.canvas.width = editer.root.scrollWidth;
        this.canvas.height = editer.root.scrollHeight;

        domtoimage.toPng(editer.root, {
            width: this.canvas.width,
            height: this.canvas.height + 20,
            quality: .5,
        }).then(dataUrl => {
            this.img.src = dataUrl;
            randomStroke(this.ctx)
        }).catch(err => {
            this.bar.MDComponent.show({
                message: err
            });
        });
    }

    render() {
        return (<div className="">
            <h2 className='title'>ANTI-OCR</h2>
            <Editor convert={this.convert} />

            <canvas ref={e => this.canvas = e}></canvas>
            <Snackbar ref={bar => { this.bar = bar; }} />
        </div>);
    }
}