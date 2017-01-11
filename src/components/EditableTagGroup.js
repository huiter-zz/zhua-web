import React, { Component } from 'react';
import { Row, Col, Form, Icon, Input, Button, Checkbox, Modal, Tag, Message } from 'antd';
import { Link } from 'dva/router';
import Block from './Block';
import Board from './Board';

class EditableTagGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputVisible: false,
            inputValue: '',
            tagsNum:''
        };
    };

    componentWillMount() {
      this.setState({tagsNum:this.props.tags.length,tags:this.props.tags});
    };

    removeTag = (removedValue) => {
        this.props.removeTag(removedValue);
        this.setState({tagsNum:this.state.tagsNum-1});
    };

    showInput = () => {
        this.setState({ inputVisible: true });
    };

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    };

    addTag = () => {
        if(this.state.tagsNum < 4){
            if(this.state.inputValue){
                this.props.addTag(this.state.inputValue);
                this.setState({inputVisible:false,tagsNum:this.state.tagsNum+1,inputValue:''});
            }else{
                this.setState({inputVisible:false});
            }
        }
    };

    render() {
        return (
            <div style={{width: 391,overflow:'hidden'}}>
                {this.state.tags && this.state.tags.map((tag, index) => {
                    const isLongTag = tag.length > 10;
                    const tagElem = (
                        <Tag key={tag} closable={index >= 0} afterClose={() => this.removeTag(tag)}>
                            {isLongTag ? `${tag.slice(0, 10)}...` : tag}
                        </Tag>
                    );
                    return tagElem;
                })}
                {(this.state.inputVisible && this.state.tagsNum < 4) && (
                    <Input
                        type="text"
                        size="small"
                        style={{ width: 78 }}
                        value={this.state.inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.addTag}
                        onPressEnter={this.addTag}
                    />
                )}
                {(!this.state.inputVisible && this.state.tagsNum < 4)&& <Button size="small" type="dashed" onClick={this.showInput}>+标签</Button>}
            </div>
        );
    }
}

export default EditableTagGroup;