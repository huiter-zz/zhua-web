import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Affix, Button, Popover, Row, Col, Carousel,Tooltip,BackTop,Layout} from 'antd';
import SnapshotLarge from '../components/SnapshotLarge';
import Block from '../components/Block';

import { Link } from 'dva/router';
import { routerRedux } from 'dva/router';
import { withRouter } from 'react-router'

// 加载其它组件

const { Header, Content, Footer } = Layout;

class IntroPage extends Component {

    constructor(props) {
      super(props);
    };

    render(){
      const text = <div><span style={{fontSize:16}}><b>客服</b></span></div>;
      const content = (
          <div>
            <p><img width="200px" src="https://omojllq5i.qnssl.com/wechat.jpeg"/></p>
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
            <Header style={{height:"60px",lineHeight:"60px",background:"#fff",textAlign: "center",padding:"0px 0px"}}>
              <Row>
                <Col span={10} offset={7}>
                  <div style={{display:"inline-block",width:180,height:"30px",background: "#eaeaea",borderRadius:"6px",textAlign:"center",lineHeight:"30px",fontSize:"15px",margin:"15px auto"}}><span>🐙</span><span style={{marginLeft:"10px"}}>爪-页面时光机</span></div>
                </Col>
                <Col xs={7} sm={7} md={7} lg={7}>
                    <Affix offsetTop={80} onChange={affixed => console.log(affixed)}>
                      <Popover placement="bottomRight" arrowPointAtCenter title={text} content={content} trigger="hover">
                        <img style={{float:"right",margin:"15px 20px 20px 0px",borderRadius:"50%",border:"1px solid #fff"}} width="28px" src={"/assets/img/huiter.jpg"} />
                      </Popover>
                    </Affix>
                    <Button style={{float:"right",marginTop:15,marginRight:"20px",border:"1px solid #fff"}} type="primary" onClick={()=>{this.props.router.push('/login');}}>开始体验</Button>
                </Col>
              </Row>
            </Header>
            <Content>                
                <div>
                  <Block height={150}></Block> 
                  <Row type="flex" justify="space-around">
                    <Col xs={22} sm={18} md={18} lg={12}  style={{maxWidth: 600}}>
                      <p style={{margin:"0px auto",color:"white",fontSize:"16px"}}>
                      <i className="fa fa-quote-left" aria-hidden="true" style={{textIndent:"32px"}}></i><span style={{padding:"0 5px"}}>🐙</span>爪是一款全新的页面抓取工具，它采用浏览器<span style={{padding:"0 5px"}}>👁</span>模拟访问技术，自动<span style={{padding:"0 5px"}}>🤖</span>以图片的方式帮你记录<span style={{padding:"0 5px"}}>💾</span>页面每一天<span style={{padding:"0 5px"}}>📆</span>的状态。无论你是做竞品分析的产品经理<span style={{padding:"0 5px"}}>🐶</span>，还是一个乐于观察的互联网爱好者<span style={{padding:"0 5px"}}>👦</span>，这个工具都会成为你的好帮手<span style={{padding:"0 5px"}}>🔨</span>。 <i className="fa fa-quote-right" aria-hidden="true"></i>
                      </p>
                    </Col>
                  </Row>

                  <Block height={120}></Block>  
                  <Row type="flex" justify="space-around">
                    <Col xs={22} sm={18} md={18} lg={12}> 
                        <Carousel autoplay>
                          <div><SnapshotLarge key={1} imageUrl={"http://oj54bwg6q.bkt.clouddn.com/58805c23adba660c53f6e127_20170309.png"} date={"2017-03-09"}/></div>
                          <div><SnapshotLarge key={2} imageUrl={"http://oj54bwg6q.bkt.clouddn.com/58805c23adba660c53f6e127_20170307.png"} date={"2017-03-03"}/></div>
                          <div><SnapshotLarge key={3} imageUrl={"http://oj54bwg6q.bkt.clouddn.com/58805c23adba660c53f6e127_20170302.png"} date={"2017-03-02"}/></div>
                          <div><SnapshotLarge key={5} imageUrl={"http://oj54bwg6q.bkt.clouddn.com/58805c23adba660c53f6e127_20170228.png"} date={"2017-02-18"}/></div>
                          <div><SnapshotLarge key={6} imageUrl={"http://oj54bwg6q.bkt.clouddn.com/58805c23adba660c53f6e127_20170215.png"} date={"2017-02-14"}/></div>
                        </Carousel>
                    </Col>
                  </Row>
                  <h1 style={{textAlign:"center",color:"white"}}>我们跟踪了「锤子科技」的历次改版。</h1> 
                </div>
                <div>
                  <Block height={150}></Block> 
                  <Block height={20}></Block>  
                  <Row type="flex" justify="space-around">
                    <Col xs={22} sm={18} md={18} lg={12}> 
                        <Carousel>
                          <div><SnapshotLarge key={1} imageUrl={"https://omojllq5i.qnssl.com/58804c2fadba660c53f6e120_20170224.png"} date={"2017-02-24"}/></div>
                          <div><SnapshotLarge key={2} imageUrl={"https://omojllq5i.qnssl.com/58804c2fadba660c53f6e120_20170223.png"} date={"2017-02-23"}/></div>
                          <div><SnapshotLarge key={3} imageUrl={"https://omojllq5i.qnssl.com/58804c2fadba660c53f6e120_20170222.png"} date={"2017-02-22"}/></div>
                        </Carousel>
                    </Col>
                  </Row>
                  <h1 style={{textAlign:"center",color:"white"}}>我们跟踪了「链家网」的每日带看。</h1> 
                </div>
                <div>
                  
                  <Block height={150}></Block>   
                  <Row type="flex" justify="space-around">
                    <Col xs={22} sm={18} md={18} lg={12}  style={{maxWidth: 650}}>
                        <div style={{margin:"0px auto",padding:"0px 0px 15px 0px",textAlign:"center"}}>
                            <h1 style={{textAlign:"center",color:"white",fontSize:"40px"}}>👇</h1>
                            <h1 style={{textAlign:"center",color:"white"}}><i className="fa fa-quote-left"></i> 页面时光机，不错过每一天 <i className="fa fa-quote-right"></i></h1>
                            <Button style={{margin:"20px 0px 0px",border:"2px solid #fff"}} size="large" type="primary" onClick={()=>{this.props.router.push('/login')}}>开始体验</Button>  
                        </div>
                        <img width="640px" src={"https://omojllq5i.qnssl.com/home.png"} />
  
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
