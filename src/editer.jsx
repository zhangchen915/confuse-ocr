import { h, Component } from 'preact'
import Quill from 'quill';
import { Button } from 'preact-material-components';

class Editor extends Component {
    editorRef = null
    modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            [{ 'font': [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['clean']
        ],
    }

    formats = [
        'header',
        'font',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'color', 'background',
        'list', 'bullet', 'indent',
    ]

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if (!this.editorRef) return;
        this.editor = new Quill(this.editorRef, {
            theme: this.props.theme,
            placeholder: this.props.placeholder,
            modules: this.modules,
            formats: this.formats,
        })
    }

    handleClick () {
        this.props.convert(this.editor)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false
    }

    render() {
        return (<div>
            <div className="editer">
                <div ref={el => { this.editorRef = el }} />
            </div>
            <Button ripple raised onClick={() => this.handleClick ()}>生成</Button>
        </div>
        )
    }
}

Editor.defaultProps = {
    placeholder: '',
    theme: 'snow',
}

export default Editor