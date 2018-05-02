import React, { Component } from 'react';
import { ScrollView,Image } from 'react-native';
import axios from 'axios';
import {
  Container, Header, Content, Footer,
  Thumbnail, Text, Icon, Button, Item, 
  Input, View, Card, CardItem, List, 
  ListItem, Left, Right, Body} from 'native-base';


class App extends Component{

  constructor(){
    super();
    this.state={resto:[],food:''};
  }

  find(){
    var x   = this.state.food;
    var url ='https://developers.zomato.com/api/v2.1/search?q='+x;
    var config = { headers:{'user-key':'c16c40e8b1272359e199240306a992b0'}
    };
    axios.get(url,config).then((ambilData)=>{
      console.log(ambilData.data);
      this.setState({
        resto:ambilData.data.restaurants
      })
    })
  }
  
  render() {
    const data=this.state.resto.map((item,index)=>{
      var nama   = [item.restaurant.name]
      var kota   = [item.restaurant.location.city]
      var alamat = [item.restaurant.location.address]
      var harga  = [item.restaurant.average_cost_for_two]/2000
      var foto   = item.restaurant.thumb;
        if (foto==''){
            foto='https://www.mearto.com/assets/no-image-83a2b680abc7af87cfff7777d0756fadb9f9aecd5ebda5d34f8139668e0fc842.png'
        }
      return( 
      <Card avatar key={index}>
      <CardItem header>
        <Left>
          <Body>
            <Text>{nama}</Text>
            <Text note>{kota} City</Text>
          </Body>
        </Left>
        <Right>
            <Text>IDR {harga}K</Text>
        </Right>
      </CardItem>
      <CardItem cardBody>
        <Image source={{uri:foto}} style={{height:400,width:400,flex:1}}/>
      </CardItem>
      <CardItem footer>
        <Left>
            <Icon name="navigate"/>
            <Text>{alamat}</Text>
        </Left>
      </CardItem>
      </Card>
      )
    })
    return (
     <Container>
       <Header searchBar rounded>
            <Item>
                <Input placeholder="Search Food..." onChangeText={(x)=>{this.setState({food:x})}}/>
                <Button transparent onPress={()=>this.find()}><Icon name="search"/></Button>
            </Item>
       </Header>
       <ScrollView>
         {data}
       </ScrollView>
     </Container>
    );
  }
}
export default App;