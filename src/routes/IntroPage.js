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
              return(<div>{ text=='normal' ? <Badge status="success" text="已完成"/>: <Badge status="processing" text="等待"/>}</div>);
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
                "title": "锤子",
                "page": "http://www.smartisan.com",
                "user": "587609dd94137e0f5c595fe5",
                "lastFetchTime": "2017-03-11T07:55:21.724Z",
                "status": "normal",
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
                "status": "normal",
                "tags": ["社区"],
                "image": "http://oj54bwg6q.bkt.clouddn.com/58804d1badba660c53f6e122_20170304.png",
                "id": "58804d1badba660c53f6e122"
              },
              {
                "title": "链家",
                "page": "http://bj.lianjia.com/",
                "lastFetchTime": "2017-03-10T08:31:44.991Z",
                "status": "fetching",
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
          <Row>
            <Col xs={0} sm={24} md={24} lg={24}>
              <BackTop visibilityHeight={200}/>
            </Col>
          </Row>
          <Layout className="layout" style={{background: "#108ee9",height:"100%"}}>
            <Header style={{height:"50px",lineHeight:"50px",background:"#fff",textAlign: "center",padding:"0px 0px"}}>
              <Row>
                <Col span={10} offset={7}>
                  <div style={{display:"inline-block",width:120,height:"30px",background: "#eaeaea",borderRadius:"6px",textAlign:"center",lineHeight:"30px",fontSize:"12px",margin:"10px auto"}}><span>🐙</span><span style={{marginLeft:"10px"}}>爪-页面时光机</span></div>
                </Col>
                <Col xs={7} sm={7} md={7} lg={7}>
                  <Affix offsetTop={0} onChange={affixed => console.log(affixed)}>
                    <Popover placement="bottomRight" arrowPointAtCenter title={text} content={content} trigger="hover">
                      <img style={{float:"right",margin:"10px 20px 20px 0px",borderRadius:"50%",border:"1px solid #fff"}} width="28px" src={"/assets/img/huiter.jpg"} />
                    </Popover>
                  </Affix>
                    <Button style={{float:"right",marginTop:10,marginRight:"20px",border:"1px solid #fff"}} type="primary" onClick={()=>{this.props.router.push('/login');}}>开始体验</Button>
               
                </Col>
              </Row>
            </Header>
            <Content>                
                <div>
                  <Block height={100}></Block> 
                  <Row type="flex" justify="space-around">
                    <Col xs={22} sm={18} md={18} lg={12}  style={{maxWidth: 650}}>
                      <p style={{margin:"0px auto",color:"white",fontSize:"16px"}}>
                        <i className="fa fa-quote-left" aria-hidden="true" style={{textIndent:"32px"}}></i> 爪是一款全新的 Web 页面抓取工具，它采用浏览器模拟访问技术，自动以图片的方式帮你记录页面每一天的状态。无论你是做竞品跟踪的产品经理，还是一个乐于观察的互联网爱好者，这个工具都会成为你的好帮手。 <i className="fa fa-quote-right" aria-hidden="true"></i>
                      </p>
                    </Col>
                  </Row>

                  <Block height={100}></Block> 
                  <h1 style={{textAlign:"center",color:"white"}}>页面时光机，不错过每一天。</h1> 
                  <Block height={20}></Block>  
                  <Row type="flex" justify="space-around">
                    <Col xs={22} sm={18} md={18} lg={12}> 
                        <Carousel autoplay>
                          <div><SnapshotLarge key={1} imageUrl={"http://oj54bwg6q.bkt.clouddn.com/58805c23adba660c53f6e127_20170309.png"} date={"锤子科技  2017-03-09"}/></div>
                          <div><SnapshotLarge key={2} imageUrl={"http://oj54bwg6q.bkt.clouddn.com/58805c23adba660c53f6e127_20170307.png"} date={"锤子科技  2017-03-03"}/></div>
                          <div><SnapshotLarge key={3} imageUrl={"http://oj54bwg6q.bkt.clouddn.com/58805c23adba660c53f6e127_20170302.png"} date={"锤子科技  2017-03-02"}/></div>
                          <div><SnapshotLarge key={4} imageUrl={"http://oj54bwg6q.bkt.clouddn.com/58805c23adba660c53f6e127_20170301.png"} date={"锤子科技  2017-03-01"}/></div>
                          <div><SnapshotLarge key={5} imageUrl={"http://oj54bwg6q.bkt.clouddn.com/58805c23adba660c53f6e127_20170228.png"} date={"锤子科技  2017-02-18"}/></div>
                          <div><SnapshotLarge key={6} imageUrl={"http://oj54bwg6q.bkt.clouddn.com/58805c23adba660c53f6e127_20170215.png"} date={"锤子科技  2017-02-14"}/></div>
                        </Carousel>
                    </Col>
                  </Row>
                </div>
                <div>
                  <Block height={100}></Block> 
                  <h1 style={{textAlign:"center",color:"white"}}>一个页面，一个月，仅收一块钱。</h1>
                  <Block height={20}></Block>  
                  <Row type="flex" justify="space-around">
                    <Col xs={22} sm={18} md={18} lg={12}  style={{maxWidth: 650}}>
                        <Table rowKey={record => record.id} style={{backgroundColor:"white",padding:"8px 8px 0px 8px",borderRadius:"0px"}} scroll={{x:600}} columns = { columns } dataSource = { data } pagination={false}/> 
                    </Col>
                  </Row>
                  <Block height={60}></Block> 
                </div>
                <div>
                  <h1 style={{textAlign:"center",color:"white"}}></h1>
                  <Block height={20}></Block>   
                  <Row type="flex" justify="space-around">
                    <Col xs={22} sm={18} md={18} lg={12}  style={{maxWidth: 650}}>
                        <div style={{margin:"0px auto",padding:"10px 0px 15px 0px",textAlign:"center"}}>
                            <h1 style={{textAlign:"center",color:"white"}}>内测期间注册，立送余额 50 元。</h1>
                            <Tooltip placement="top" title={"点我！"}>
                              <Button style={{margin:"50px 0px 0px"}} size="large" type="default" onClick={()=>{this.props.router.push('/register')}}>立即注册</Button>  
                            </Tooltip>
                        </div>
                        <Block height={100}></Block>  
                    </Col>
                  </Row>
                </div>
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
