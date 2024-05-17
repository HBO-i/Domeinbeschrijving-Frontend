import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate, useSearchParams} from 'react-router-dom';
import {route, useForm, useLocale} from 'b302-frontend-library';

// import {ReactComponent as Logo} from '../../../assets/logo.svg';
import Logo from '../../../assets/KUBUS.png';
import {ReactComponent as WorldIcon} from '../../../assets/icons/globe.svg';
import MenuButton from './MenuButton';
import ToggleButton from '../../partials/ToggleButton';
import Dropdown, {DropdownItem} from '../../partials/Dropdown';
import {isDesktop} from '../../../utils/MediaQuery';
import Input from '../../partials/Input';
import {useDownloadURLS} from '../../../config/Url';

interface Props {}

const NavBar: FunctionComponent<Props> = (props) => {
    const { __, setLocale } = useLocale();
    const location = useLocation();
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const downloadURLS = useDownloadURLS();

    const ref = useRef<HTMLDivElement>(null);

    const [form, onFormChange] = useForm<{ en: boolean, search: string }>(f => ({
        en: f.check(false),
        search: f.input(params.get('search') ?? '')
    }));

    const [searchTimeout, setSearchTimeout] = useState<any>();
    const [open, setOpen] = useState<boolean>(isDesktop());

    useEffect(() => {
        setLocale(
            form.values.en ? 'en' : 'nl'
        );
    }, [form.values.en]);

    useEffect(() => {
        if (location.pathname !== route('search'))
            form.set({ search: '' });
    }, [location.key]);

    useEffect(() => {
        document.addEventListener('click', (e) => {
            if (isDesktop())
                return;

            if (e.target instanceof Node && !ref.current?.contains(e.target))
                setOpen(false);
        });
    }, []);

    const toggleMenu = () => {
        setOpen(open => !open);
    };

    const goTo = (page: string) => () => navigate(route(page));

    const enterSearch = () => {
        if (form.values.search === '')
            return;

        navigate({
            pathname: route('search'),
            search: '?search=' + form.values.search,
        });
    };

    useEffect(() => {
        clearTimeout(searchTimeout);
        setSearchTimeout(
            setTimeout(enterSearch, 700)
        );
    }, [form.values.search]);

    const openExternPage = (path: string) => {
        window.open(path, '_blank');
    };

    const downloadFile = (path: string) => {
        const a = document.createElement('a');
        a.setAttribute('href', path);
        a.setAttribute('download', '')
        a.click();
        a.remove();
    };

    return (
        <div className={'navbar'} ref={ref}>
            <div className={'navbar__left'}>
                {/*<Logo className={'navbar__logo'} onClick={goTo('home')} />*/}
                <img className={'navbar__logo'} onClick={goTo('home')} src={Logo} alt={'logo'} />
            </div>

            <div className={'navbar__right'}>
                <div className={'navbar__menu-button'}>
                    <MenuButton active={open} onClick={toggleMenu} />
                </div>

                <div className={`navbar__menu ${open ? 'navbar__menu--open' : ''}`}>
                    <div className={'navbar__locale'}>
                        <WorldIcon className={'navbar__icon'} />
                        <ToggleButton id={'en'} form={form} onFormChange={onFormChange} labels={['EN', 'NL']} />
                    </div>

                    <div>
                        <span className={'navbar__menu-item'} onClick={goTo('universities')}>{__('hboIMembers')}</span>

                        <Dropdown title={__('export')}>
                            <DropdownItem onClick={() => downloadFile(downloadURLS.pdf)}>PDF</DropdownItem>
                            <DropdownItem onClick={() => downloadFile(downloadURLS.excel_sheet)}>Excel</DropdownItem>
                            <DropdownItem onClick={() => openExternPage(downloadURLS.json)}>JSON</DropdownItem>
                            <DropdownItem onClick={() => openExternPage(downloadURLS.docs)}>API</DropdownItem>
                        </Dropdown>

                        <div className={'navbar__input'}>
                            <Input
                                id={'search'}
                                form={form}
                                onChange={onFormChange}
                                hint={__('searchInDomainDescription')}
                                onKeyUp={e => e.key === 'Enter' && enterSearch()}
                                icon={'search'} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;

