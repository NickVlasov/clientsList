import React, { Component } from 'react';
import { fetchClients } from '../actions';
import ClientsList from './clients_list';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';

class ClientsIndex extends Component {
    componentDidMount() {
        this.props.fetchClients();
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        this.props.fetchClients(3000+selected*50);
    };

    render() {
        return (
            <div>
                <ClientsList clients={this.props.clients} />
                <ReactPaginate previousLabel={"previous"}
                    nextLabel={"next"}
                    breakLabel={<a href="">...</a>}
                    breakClassName={"break-me"}
                    pageCount={20}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    nextClassName="page-item"
                    previousLinkClassName="page-link"
                    nextLinkClassName="page-link"
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"} />
            </div >
        )
    }
}

function mapStateToProps(state) {
    return { clients: state.clients };
}

export default connect(mapStateToProps, { fetchClients })(ClientsIndex);