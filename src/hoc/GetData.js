import React, { Component } from 'react';
import { fetchApi } from '../service/api';

import Loader from '../../components/Loader';
import config from '../config';

const styles = makeStyles(() => ({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

export default function withAPICategories() {

    return WrappedComponent => class extends Component {
        state = {
            loading: false,
            error: false,
            data: [],
            produit: {}
        }

        componentWillUnmount() {
            this.mounted = false;
        }

        componentDidMount() {
            this.mounted = true;
            this.reload();
        }

        fetchFromApi = () => {
            if (this.state.loading) {
                return;
            }

            this.setState({
                loading: true,
                error: false
            });

            const test = fetchApi({
                url: `${config.url.biz}`,
                method: 'GET', body: null, statusCode: 200
            })
            console.log(test)
        }
        // .catch ((e) => this.setState({ loading: false, error: true }));

        reload = () => this.fetchFromApi()

        render() {
            const { loading, error, data } = this.state;
            const { ...props } = this.props;

            return (error &&
                <View style={styles.container}>
                    <Text>Une erreur est survenue, veuillez rechargez la page</Text>
                </View>)
                || loading && <Loader /> ||
                <WrappedComponent {...props} data={data} reload={this.reload} />;
        }
    }
}
