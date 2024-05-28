import React, {FunctionComponent, useEffect} from 'react';
import Router from './Router';
import Content from './Content';
import NavBar from './navbar/NavBar';
import Footer from './Footer';
import HBOFilter from '../partials/HBOFilter/HBOFilter';
import Modal, {useModal} from '../partials/Modal';
import {app, useLocale} from 'b302-frontend-library';

interface Props {}

const Layout: FunctionComponent<Props> = () => {
    const locale = useLocale();
    const modalController = useModal();

    useEffect(() => {
        app().onEvent('toggle_filter', () => modalController.toggle());
    }, []);

    if (locale.locale === 'nl')
        locale.setLocale('nl');

    return (
        <React.Fragment>
            <header>
                <NavBar />
            </header>

            <Content>
                <Modal controller={modalController}>
                    <HBOFilter modalController={modalController} />
                </Modal>

                <Router />
            </Content>

            <Footer />
        </React.Fragment>
    );
};

export default Layout;
