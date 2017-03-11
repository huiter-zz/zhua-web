import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Affix, Table, Input, Icon, Button, Popover, Popconfirm, Alert, Badge, Tag, Row, Col, Pagination, Carousel,Tooltip,BackTop} from 'antd';
import { Layout, Menu, Breadcrumb } from 'antd';
import SnapshotLarge from '../components/SnapshotLarge';
import Block from '../components/Block';
import Board from '../components/Board';
import Screen from '../components/Screen';
import { Link } from 'dva/router';
import { routerRedux } from 'dva/router';
import { withRouter } from 'react-router'

// 加载其它组件

const Search = Input.Search;
const InputGroup = Input.Group;
const { Header, Content, Footer } = Layout;

class IntroPage extends Component {

    constructor(props) {
      super(props);
    };

    render(){
      const columns = [{
          title: '页面名称',
          dataIndex: 'title',
          width: 120,
          render: (text, record, index) => (
            <div>
              <Screen imageUrl={record.image} title={text} id={record.id}></Screen>
            </div>
          )
        },{
            title: '链接',
            dataIndex: 'page',
             width: 150,
            render: ( text, record, index) => (
              <a href={text} style={{display: "inline-block",maxWidth: "200px"}} target="_blank">{text}</a>
            )
        },{
          title: '标签',
          dataIndex: 'tags',
          key: 'tags',
           width: 70,
          render: (tags) => {
            return (tags && tags.map((tag) => {
                  let tagElem = (
                      <Tag key={tag} style={{cursor:'text'}}>
                        {tag}
                      </Tag>
                  );
                  return tagElem;
                }))
          }
        },{
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 70,

            render: (text, record, index) => {

              let a = moment(record.lastFetchTime).valueOf();
              let b = new Date().valueOf() - 86400000;
              return(<div>{ a>b ? <Badge status="success" text="已完成"/>: <Badge status="processing" text="等待"/>}</div>);
            }
        },{
            title: '最近抓取时间',
            dataIndex: 'lastFetchTime',
            key: 'lastFetchTime',
            width: 140,
            render: (text, record, index) => {
              return(<div>{record.lastFetchTime ? moment(record.lastFetchTime).format('YYYY-MM-DD HH:mm:ss'):'无效时间'}</div>);
            }
        },{
            title: '操作',
            dataIndex: 'operation',
            width: 100,
            render: ( text, record, index) => (
              <div>
                  <Tooltip placement="top" title={"编辑"}>
                    <Button type="ghost" icon="edit" style={{marginRight:"8px",marginBottom:"6px"}}></Button>
                  </Tooltip> 
                  <Tooltip placement="top" title={"查看归档"}>
                    <Button type="ghost" icon="inbox" style={{marginRight:"8px",marginBottom:"6px"}}></Button>
                  </Tooltip>
                  <Popconfirm title="确定要删除吗？">
                    <Tooltip placement="right" title={"删除"}>
                      <Button type="ghost" icon="delete" style={{marginRight:"8px",marginBottom:"6px"}}></Button>
                    </Tooltip>
                  </Popconfirm>
                </div>
            )
      }];
      const data = [
              {
                title: "微信",
                page: "http://weixin.qq.com/",
                user: "587609dd94137e0f5c595fe5",
                lastFetchTime: "2017-03-11T06:46:45.559Z",
                createdTime: 1485069733247,
                status: "normal",
                canFetchTime: "2017-03-12T06:46:45.559Z",
                retryTimes: 0,
                setting: {
                  "size": []
                },
                tags: ["社交"],
                image: "http://oj54bwg6q.bkt.clouddn.com/58845da5dda92a1f96ddac25_20170311.png",
                id: "58845da5dda92a1f96ddac25"
              },
              {
                "title": "锤子",
                "page": "http://www.smartisan.com",
                "user": "587609dd94137e0f5c595fe5",
                "lastFetchTime": "2017-03-11T07:55:21.724Z",
                "createdTime": 1484807203064,
                "status": "normal",
                "canFetchTime": "2017-03-12T07:55:21.724Z",
                "retryTimes": 0,
                "setting": null,
                "tags": [
                  "手机"
                ],
                "image": "http://oj54bwg6q.bkt.clouddn.com/58805c23adba660c53f6e127_20170311.png",
                "id": "58805c23adba660c53f6e127"
              },
              {
                "title": "豆瓣",
                "page": "https://www.douban.com/",
                "user": "587609dd94137e0f5c595fe5",
                "lastFetchTime": "2017-03-10T08:31:49.235Z",
                "createdTime": 1484803355647,
                "status": "fetching",
                "canFetchTime": "2017-03-05T02:31:49.235Z",
                "retryTimes": 0,
                "setting": {
                  "size": []
                },
                "tags": ["社区"],
                "image": "http://oj54bwg6q.bkt.clouddn.com/58804d1badba660c53f6e122_20170304.png",
                "id": "58804d1badba660c53f6e122"
              },
              {
                "title": "链家",
                "page": "http://bj.lianjia.com/",
                "user": "587609dd94137e0f5c595fe5",
                "lastFetchTime": "2017-03-10T08:31:44.991Z",
                "createdTime": 1484803119231,
                "status": "fetching",
                "canFetchTime": "2017-03-05T02:31:44.991Z",
                "retryTimes": 0,
                "setting": {
                  "size": []
                },
                "tags": ["重点"],
                "image": "http://oj54bwg6q.bkt.clouddn.com/58804c2fadba660c53f6e120_20170304.png",
                "id": "58804c2fadba660c53f6e120"
              }
      ];

      const text = <div><span style={{fontSize:16}}><b>1 号客服</b></span></div>;
      const content = (
        <div>
          <p>无论遇到什么问题，都可以通过以<br/>下方式联系我 ^o^</p>
          <p><i className="fa fa-weixin"></i>：huiter</p>
          <p><i className="fa fa-paper-plane"></i>：i@huiter.me</p>
        </div>
      );

      return (
        <div>
          <BackTop visibilityHeight={200}/>
          <Layout className="layout" style={{background: "#108ee9",height:"100%"}}>
            <Header style={{height:"50px",lineHeight:"50px",background:"#fff",textAlign: "center"}}>
              <Row>
                <Col span={12} offset={6}>
                  <div style={{display:"inline-block",width:120,height:"30px",background: "#eaeaea",borderRadius:"6px",textAlign:"center",lineHeight:"30px",fontSize:"12px",margin:"10px auto"}}><span>🐙</span><span style={{marginLeft:"10px"}}>爪-页面时光机</span></div>
                </Col>
                <Col span={6}>
                  <Affix offsetTop={0} onChange={affixed => console.log(affixed)}>
                    <Popover placement="bottomRight" arrowPointAtCenter title={text} content={content} trigger="hover">
                      <img style={{float:"right",margin:"10px 0px 20px",borderRadius:"50%",border:"1px solid #fff"}} width="28px" src={"/assets/img/huiter.jpg"} />
                    </Popover>
                    <Button style={{float:"right",marginTop:10,marginRight:"20px",border:"1px solid #fff"}} type="primary" onClick={()=>{this.props.router.push('/login');}}>开始体验</Button>
                  </Affix>
                </Col>
              </Row>
            </Header>
            <Content>                
                <div>
                  <Block height={100}></Block> 
                  <h1 style={{textAlign:"center",color:"white"}}>页面时光机，不错过每一天。</h1>
                  <p style={{margin:"10px auto",width:650,textAlign:"center",color:"white"}}>爪是一款全新的 Web 页面抓取工具，它采用浏览器模拟浏览技术，自动对内容进行图片化存储，帮你记录页面每一天的状态。无论你是做竞品跟踪的产品狗，还是一个乐于观察的互联网爱好者，这个工具都会成为你的好帮手。</p>
                  <Block height={20}></Block>  	 
                  <Row type="flex" justify="space-around">
                    <Col xs={22} sm={18} md={18} lg={12}>
                        <Carousel autoplay effect="fade">
                          <Row type="flex" justify="center"><SnapshotLarge key={1} imageUrl={"http://oj54bwg6q.bkt.clouddn.com/58805c23adba660c53f6e127_20170309.png"} date={"2017-03-09"}/></Row>
                          <Row type="flex" justify="center"><SnapshotLarge key={2} imageUrl={"http://oj54bwg6q.bkt.clouddn.com/58805c23adba660c53f6e127_20170307.png"} date={"2017-03-03"}/></Row>
                          <Row type="flex" justify="center"><SnapshotLarge key={3} imageUrl={"http://oj54bwg6q.bkt.clouddn.com/58805c23adba660c53f6e127_20170302.png"} date={"2017-03-02"}/></Row>
                          <Row type="flex" justify="center"><SnapshotLarge key={4} imageUrl={"http://oj54bwg6q.bkt.clouddn.com/58805c23adba660c53f6e127_20170301.png"} date={"2017-03-01"}/></Row>
                          <Row type="flex" justify="center"><SnapshotLarge key={5} imageUrl={"http://oj54bwg6q.bkt.clouddn.com/58805c23adba660c53f6e127_20170228.png"} date={"2017-02-18"}/></Row>
                          <Row type="flex" justify="center"><SnapshotLarge key={6} imageUrl={"http://oj54bwg6q.bkt.clouddn.com/58805c23adba660c53f6e127_20170215.png"} date={"2017-02-14"}/></Row>
                        </Carousel>
                    </Col>
                  </Row>
                  <Block height={60}></Block> 
                </div>
                <div>
                  <Block height={60}></Block> 
                  <h1 style={{textAlign:"center",color:"white"}}>根据链接计费，30 天只要 1 元。</h1>
                  <Block height={40}></Block>    
                  <Row type="flex" justify="space-around">
                    <Col xs={22} sm={18} md={18} lg={12}  style={{maxWidth: 650}}>
                        <Block height={10}></Block>
                        <Table rowKey={record => record.id} style={{backgroundColor:"white",padding:"8px 8px",borderRadius:"0px"}} scroll={{x:600}} columns = { columns } dataSource = { data } pagination={false}/> 
                        <Block height={20}></Block>
                    </Col>
                  </Row>
                  <Block height={60}></Block> 
                </div>
                <div style={{width:650,margin:"0px auto",padding:"10px 0px 15px 0px",backgroundColor:"#ffffff",textAlign:"center"}}>
                  <p style={{textAlign:"center",color:"rgb(0, 0, 0, 0.65)",padding:"10px",fontSize:"16px"}}>现在新用户注册，立送 <span style={{color:"rgb(233, 37, 158)"}}>50 元</span> 体验金。</p>
                  <Button style={{margin:"10px 0px 0px"}} type="primary" onClick={()=>{this.props.router.push('/register')}}>立即注册</Button>  
                </div>
                <Block height={100}></Block>  
            </Content>
            <Footer>
              <p style={{ textAlign:'center',color:"white"}}>
                版权所有 © 2017 爪小组
              </p>
            </Footer>
          </Layout>
        </div>
      );
    }
};


function mapStateToProps({app}) {
  return {app};
}

export default connect(mapStateToProps)(withRouter(IntroPage));
