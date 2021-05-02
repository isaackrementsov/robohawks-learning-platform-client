import { InstructorProtectedForm } from '../components/AuthProtectedForm';
import { PageLayout } from '../components/Nav';
import requests from '../../requests';

import { CgImage, CgMathPlus, CgCheck } from 'react-icons/cg';
import Files from 'react-files';
import TextareaAutoSize from 'react-textarea-autosize';

export default class CreateCourse extends InstructorProtectedForm {

    constructor(props){
        super(props, '/course', 'POST');

        this.addPage = this.addPage.bind(this);
        this.state = {
            ...this.state,
            data: {
                name: '',
                description: '',
                type: 'page',
                page: '',
                pages: []
            }
        }
    }

    render(){
        return (
            <PageLayout
                history={this.props.history}
                style={{
                    paddingTop: '25px',
                    background: this.state.files.length > 0 ?
                        requests.cssURL(this.state.files[0].preview.url)
                        :
                        'linear-gradient(115deg, #FF5252, #F50057)',
                    color: 'white',
                    alignItems: 'flex-end'
                }}
                title={
                    <div className="course-header">
                        <input
                            type="text"
                            name="name"
                            onChange={this.handleChange}
                            value={this.state.data.name}
                            placeholder="Course title"
                        />
                        <br/>
                        <TextareaAutoSize
                            value={this.state.data.description}
                            name="description"
                            onChange={this.handleChange}
                            placeholder="Add a description..."
                            spellCheck={false}
                        />
                    </div>
                }
                customNav={
                    <li className="nav-item">
                        <div className="nav-link avatar">
                            <Files
                              className="file-dropzone clear"
                              onChange={this.handleFilesChange}
                              onError={this.handleFilesError}
                              accepts={['image/png', 'image/jpg', 'image/svg', 'image/bmp', 'image/jpeg']}
                              maxFileSize={10000000}
                              minFileSize={0}
                              required
                            >
                                <CgImage color="rgba(255, 255, 255, 0.5)" size="1.7em"/>
                            </Files>
                        </div>
                    </li>
                }
            >
                <form>
                    {this.state.res.data && this.state.res.data.error &&
                        <div className="label error-label">
                            {this.state.res.data.error}
                        </div>
                    }
                    <h3>Syllabus</h3>
                    <div className="label inline">
                        <CgMathPlus size='1.4em'/>
                        <select value={this.state.data.type} onChange={this.handleChange} name="type">
                            <option value="page">Page</option>
                            <option value="assessment">Assessment</option>
                            <option value="credential">Credential</option>
                        </select>
                    </div>
                    {this.renderModuleForm()}
                    <hr/>
                    <p></p>
                    <input type="submit" value="Save"/>
                </form>
            </PageLayout>
        );
    }

    renderModuleForm(){
        switch(this.state.data.type){
            case 'page':
                return (
                    <>
                        <div className="label">
                            Add a Notion page
                            <div className="flex-container vertical-center">
                                <input type="text" placeholder="Enter link" name="page" value={this.state.data.page} onChange={this.handleChange}/>
                                {this.isValid(this.state.data.page) &&
                                    <span onClick={this.addPage}><CgCheck size="1.5em" className="pointer" style={{marginLeft: '10px'}}/></span>
                                }
                            </div>
                        </div>
                    </>
                );
            case 'assessment':
                return (
                    <div className="label"></div>
                );
            case 'credential':
                return (
                    <div className="label"></div>
                );
            default:
                return '';
        }
    }

    isValid(url){
        return url.includes('notion.so');
    }

    async addPage(_e){
        const url = this.state.data.page;

        if(this.isValid(url)){
            let pages = this.state.data.pages;
            this.setData({page: '', pages});
        }else{
            this.setError('Please set a valid URL');
        }
    }
}
