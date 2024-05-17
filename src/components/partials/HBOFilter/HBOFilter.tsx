import React, {createContext, FunctionComponent, useContext, useEffect, useState} from 'react';
import {
    FormAccessor,
    FormChangedEvent,
    OnFormChangeCallback,
    route,
    useForm,
    useLocale
} from 'b302-frontend-library';
import {useNavigate} from 'react-router-dom';

import {ReactComponent as SwitchIcon} from '../../../assets/icons/switch-vertical.svg';
import {ReactComponent as XMark} from '../../../assets/icons/xmark.svg';

import Cube, {CubeFace} from '../Cube/Cube';
import {ModalController} from '../Modal';
import HBOFilterFace from './HBOFilterFace';
import Title from '../Title';
import HBOFilterActions from './HBOFilterActions';
import Checkbox from '../Checkbox';
import Button from '../Button';
import {useFilterIndexQuery} from '../../../data/query/Query';
import HBOFilterTaskOrder from './HBOFilterTaskOrder';
import Tooltip from '../Tooltip';
import {useFilter} from '../../contexts/FilterContext';
import { hintIsSafari } from 'utils/Util';
import HTML from '../HTML';

export interface HBOFilterForm {
    allOn: boolean;
    allOff: boolean;
}

export interface HBOFilterData {
    activities: number[];
    architecture_layers: number[];
    levels: number[];
}

interface HBOFilter {
    cubeFace: number;
    next: () => void;
    previous: () => void;
    setFace: (face: number) => void;
    form: FormAccessor<HBOFilterForm>;
    onFormChange: OnFormChangeCallback<HBOFilterForm>;
    toggle: (key: keyof HBOFilterData, id: number) => void;
    data: HBOFilterData;
}

const HBOFilterContext = createContext({} as HBOFilter);
export const useHBOFilter = () => useContext<HBOFilter>(HBOFilterContext);

type CheckForm = { allOn: boolean, allOff: boolean };

interface Props {
    modalController: ModalController;
}

const HBOFilter: FunctionComponent<Props> = (props) => {
    const {__} = useLocale();
    const navigate = useNavigate();

    const { data } = useFilterIndexQuery();
    const filter = useFilter();

    const [cubeFace, setCubeFace] = useState<number>(1);
    const [idle, setIdle] = useState(true);
    const [initial, setInitial] = useState(true);

    const [form, onFormChange] = useForm<CheckForm>(f => ({
        allOff: f.check(false),
        allOn: f.check(true)
    }));

    const activeData = filter.data;

    const setActiveFilterData = (data: Omit<HBOFilterData, 'search'>) => {
        filter.setData({...activeData, ...data});
    };

    useEffect(() => {
        setIdle(false);

        const timeout = setTimeout(() => setIdle(true), 600);
        return () => clearTimeout(timeout);
    }, [cubeFace]);

    useEffect(() => {
        if (!data)
            return;

        form.set({
            allOn: filter.allOn
        });
    }, [filter.allOn, data]);

    useEffect(() => {
        if (!data)
            return;

        if (initial && filter.filtersSelected) {
            return;
        }

        if (form.values.allOff)
            filter.empty();

        if (form.values.allOn) {
            filter.setData({
                ...filter.data,
                activities: data?.activities.map(a => a.id),
                levels: data?.levels.map(a => a.id),
                architecture_layers: data?.architecture_layers.map(a => a.id),
            });
        }

        setInitial(false);
    }, [form.values.allOff, form.values.allOn, data]);

    useEffect(() => {
        if (filter.filtersSelected && form.values.allOff)
            form.set({
                allOff: false
            });
    }, [filter.filtersSelected]);

    useEffect(() => {
        const { open, finishedAnimating } = props.modalController;

        if (!finishedAnimating || open)
            return;

        setCubeFace(1);
    }, [props.modalController.finishedAnimating, props.modalController.open]);

    const nextFace = () => {
        setCubeFace(face => Math.min(face + 1, 4));
    };

    const prevFace = () => {
        setCubeFace(face => Math.max(face - 1, 0));
    };

    const toggleValue = (key: keyof HBOFilterData, value: number) => {
        const newData = {...activeData};

        const index = newData[key].findIndex(i => i === value);

        if (index === -1) {
            newData[key].push(value);
        } else {
            newData[key].splice(index, 1);
        }

        setActiveFilterData(newData);
    };

    const hboFilter: HBOFilter = {
        cubeFace,
        next: nextFace,
        previous: prevFace,
        setFace: setCubeFace,
        form,
        onFormChange,
        data: activeData,
        toggle: toggleValue
    };

    const onCheckboxChange = (e: FormChangedEvent<CheckForm>) => {
        let otherKey: keyof CheckForm = e.id === 'allOn' ? 'allOff' : 'allOn';
        form.set({
            [e.id]: e.value,
            [otherKey]: false
        });
    };

    const doFilter = () => {
        filter.setActive(true);
        // filter.setData({ ...filter.data, ...filterData });

        props.modalController.toggle(false);

        navigate(route('tasks'));
        window.scrollTo({top: 0});
    };

    return (
        <HBOFilterContext.Provider value={hboFilter}>
            <div className={`hbo-filter ${idle ? 'hbo-filter--idle' : ''} hbo-filter--face${cubeFace} ${hintIsSafari() ? 'hbo-filter--safari' : ''}`}>
                <Cube face={cubeFace}>
                    <CubeFace front>
                        <XMark className={'hbo-filter__icon hbo-filter__icon--close'} onClick={() => props.modalController.toggle()}/>

                        <Title small>{__('filter.welcomeToFilter')}</Title>

                        <div className={'hbo-filter__text-box'}>{__('filter.welcomeText')}</div>

                        <HBOFilterActions>
                            <Checkbox form={hboFilter.form} onFormChange={onCheckboxChange} id={'allOn'} hint={__('allOn')}/>
                            <Checkbox form={hboFilter.form} onFormChange={onCheckboxChange} id={'allOff'} hint={__('allOff')} />
                        </HBOFilterActions>

                        <div className={'flex--d flex--justify-end'}>
                            <Button onClick={() => hboFilter.next()}>{__('filter.configure')}</Button>
                        </div>

                        <div className={'hbo-filter__order'}>
                            <div>
                                <span className={'hbo-filter__text--order'}>
                                    <span dangerouslySetInnerHTML={{ __html: __('orderOfTasks')}} />

                                    <div className={'hbo-filter__tooltip hbo-filter__tooltip--top'}>
                                        <Tooltip content={'Door te slepen met de 3 zwarte knoppen bepaal je de volgorde waarin de gevonden beroepstaken getoond worden.'} />
                                    </div>
                                </span>
                            </div>

                            <div>
                                <HBOFilterTaskOrder onOrderChange={() => null} />
                                <SwitchIcon className={'hbo-filter__icon--switch'} />
                            </div>
                        </div>

                        <div className={'flex--d flex--justify-end flex--align-center'}>
                            { !filter.filtersSelected &&
                                <span className={'hbo-filter__text--warning'}>{__('noFiltersSelected')}</span>
                            }
                            <Button onClick={doFilter} disabled={!filter.filtersSelected}>GO!</Button>
                        </div>
                    </CubeFace>

                    <CubeFace right>
                        <HBOFilterFace
                            title={__('architectureLayers')}
                            dataKey={'architecture_layers'}
                            items={data?.architecture_layers ?? []}
                            hint={<>
                                <div dangerouslySetInnerHTML={{ __html: __('filter.architectureHint') }} />
                            </>}
                            navigation={{
                                prevLabel: __('filter.backToFilter'),
                                nextLabel: __('activities'),
                            }} />
                    </CubeFace>

                    <CubeFace back>
                        <HBOFilterFace
                            title={__('activities')}
                            dataKey={'activities'}
                            items={data?.activities ?? []}
                            hint={<>
                                <HTML html={__('filter.activitiesHint')} />
                            </>}
                            navigation={{
                                prevLabel: __('architectureLayers'),
                                nextLabel: __('courseLevels'),
                            }} />
                    </CubeFace>

                    <CubeFace left>
                        <HBOFilterFace
                            title={__('courseLevels')}
                            dataKey={'levels'}
                            items={data?.levels.map((l, i) => ({ ...l, value: __('level', l.value) })) ?? []}
                            hint={<>
                                <HTML html={__('filter.levelsHint')} />
                            </>}
                            navigation={{
                                prevLabel: __('activities'),
                                nextLabelRaw: __('setOrder'),
                                onNextClick: () => setCubeFace(1)
                            }} />
                    </CubeFace>
                </Cube>
            </div>
        </HBOFilterContext.Provider>
    );
};

export default HBOFilter;
