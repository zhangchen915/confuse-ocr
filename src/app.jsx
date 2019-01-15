import { h, Component } from 'preact';
import { withText, Text } from 'preact-i18n';
import { Snackbar, Select } from 'preact-material-components';
import 'preact-material-components/List/style.css';
import 'preact-material-components/Menu/style.css';
import 'preact-material-components/Select/style.css';

import domtoimage from 'dom-to-image';

import Editor from './editer';
import { contentHeight, randomStroke } from './component/utility'
import Button from "preact-material-components/Button";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            antiStyle: 1,
            editer: {}
        };
    }

    componentDidMount() {
        this.img = new Image();
        this.ctx = this.canvas.getContext("2d");
        this.img.onload = () => {
            this.ctx.drawImage(this.img, 0, 0);
        }
    }

    setEditer = (editer) => {
        this.setState({ editer: editer })
    };

    convert = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.canvas.width = this.state.editer.root.scrollWidth;
        this.canvas.height = contentHeight(this.state.editer);

        domtoimage.toPng(this.state.editer.root, {
            width: this.canvas.width,
            height: this.canvas.height + 20,
            quality: .5,
        }).then(dataUrl => {
            this.img.src = dataUrl;
            randomStroke(this.ctx, this.state.antiStyle)
        }).catch(err => {
            this.bar.MDComponent.show({
                message: err
            });
        });
    };

    render() {
        return (<div className="wrap">
            <h2 className='title'>ANTI-OCR</h2>
            <Editor setEditer={this.setEditer} />

            <Select className='selectAntiStyle' hintText="选择对抗方式"
                selectedIndex={this.state.antiStyle}
                outlined={true}
                onChange={e => {
                    this.setState({
                        antiStyle: e.target.selectedIndex
                    });
                }}>
                <Select.Item>⬜</Select.Item>
                <Select.Item>⚪</Select.Item>
                <Select.Item>——</Select.Item>
                <Select.Item>- - -</Select.Item>
            </Select>
            <Button className='generate' ripple raised onClick={() => this.convert()}>生成</Button>

            <canvas width={0} height={0} ref={e => this.canvas = e} />
            <Snackbar ref={bar => {
                this.bar = bar;
            }} />
        </div>);
    }
}