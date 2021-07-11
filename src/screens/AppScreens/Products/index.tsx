import React, {Component} from 'react';
import {View, FlatList, ActivityIndicator, Text} from 'react-native';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import {connect} from 'react-redux';

//local
import styles from './styles';
import {Header} from '../../../components';
import {AvatarItem} from '../../../components';

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface itemProp {
  item: any;
}

interface State {
  page: number;
  limit: number;
  products: {
    data: any[];
    pagination_data: {};
  };
  loading: boolean;
}

class Products extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      page: 1,
      limit: 5,
      products: {
        data: [],
        pagination_data: {},
      },
      loading: true,
    };

    this.updateData = this.updateData.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.updateData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.products.data.length !== this.props.products.data.length) {
      this.updateData();
    }
  }

  handleAddProduct = () => {
    /**
     * TODO
     *
     * stack for add product form
     */
    const {navigation} = this.props;
    navigation.navigate('AddProduct');
  };

  updateData() {
    const {products} = this.props;
    console.log(this.props, 'products');

    if (products && products.data.length > 0) {
      let newState = {
        data: [],
        pagination_data: {},
      };

      newState.data = this.getData(products.data);
      newState.pagination_data = products.pagination_data;

      console.log(newState, 'newState');
      this.setState({
        products: newState,
        loading: false,
      });
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  getData(data) {
    let tempArr: any[] = [];
    const {products} = this.props;
    //populate tempArr
    for (let i = 0; i <= data.length - 1; i++) {
      tempArr.push(data[i]);
    }
    if (products.pagination_data.total_count <= 1) {
      // slice it
      tempArr = tempArr.splice(
        (this.state.page - 1) * this.state.limit,
        this.state.limit,
      );
    }

    return tempArr;
  }

  render() {
    const {navigation} = this.props;
    const {loading, products} = this.state;
    const {data} = products;
    console.log(this.state, 'state');
    return (
      <View style={styles.container}>
        <Header
          title="Products"
          leftButtonPress={() => navigation.openDrawer()}
          rightButtonPress={() => this.handleAddProduct()}
        />
        {loading && (
          <View style={styles.loadingFooter}>
            <ActivityIndicator />
          </View>
        )}
        {!loading && data && data.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No Product Available, Please Add using [+]
            </Text>
          </View>
        ) : null}
        {!loading && (
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={({item}: itemProp) => {
              return (
                <AvatarItem
                  image={item.image}
                  name={item.name}
                  description={item.description}
                />
              );
            }}
            onEndReached={() => {
              //after 5 prdocuts
              if (
                this.props.products.pagination_data &&
                this.props.products.pagination_data.current_count >= this.state.limit
              ) {
                this.setState(
                  {
                    // loading: true,
                    page: this.state.page + 1,
                    limit: this.state.limit + 5,
                  },
                  () => {
                    this.updateData();
                  },
                );
              }
            }}
            ListFooterComponent={
              loading ? (
                <View style={styles.loadingFooter}>
                  <ActivityIndicator />
                </View>
              ) : null
            }
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  products: state.product.data,
  // loading: state.product.loading,
});

export default connect(mapStateToProps, {})(Products);
