import {h, Component} from 'preact'
import Quill from 'quill';

class Editor extends Component {
    editorRef = null;
    modules = {
        toolbar: [
            [{'header': [1, 2, false]}],
            [{'font': []}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'color': []}, {'background': []}],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            ['clean']
        ],
    };

    formats = [
        'header',
        'font',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'color', 'background',
        'list', 'bullet', 'indent',
    ];

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if (!this.editorRef) return;
        this.editor = new Quill(this.editorRef, {
            theme: 'snow',
            modules: this.modules,
            formats: this.formats,
        });
        this.props.setEditer(this.editor)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false
    }

    render() {
        return (<div className="editer">
            <div ref={el => {
                this.editorRef = el
            }}/>
        </div>)
    }
}

export default Editor