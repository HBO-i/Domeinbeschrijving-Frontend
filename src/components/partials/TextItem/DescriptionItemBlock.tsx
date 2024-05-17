import {FunctionComponent} from 'react';
import {DescriptionItem} from '../../../data/Types';
import DescriptionItemCard from './DescriptionItemCard';
import { useLocale } from 'b302-frontend-library';

interface LevelContainer {
    levels: number[];
}

interface Props {
    item: DescriptionItem;
    start?: number;
    bigLevels?: number[];
    highlight?: string;
}

const DescriptionItemBlock: FunctionComponent<Props> = (props) => {
    const {__} = useLocale();
    const bigWordLetterCount = 12;

    const bigLevels: number[] = props.bigLevels ?? [];

    const generateTextItem = (item: DescriptionItem | string[], level: number) => {
        if (Array.isArray(item)) {
            return (
                <DescriptionItemCard level={level} content={item} highlight={props.highlight} key={item.length} />
            );
        }

        const isTextType = typeof item.items[0] === 'string';
        const value = item.value.length > 1 ? item.value : `${__('level', item.value)}`;

        if (item.value.length > bigWordLetterCount && !bigLevels.includes(level))
            bigLevels.push(level);

        if (!isTextType && (item.items as DescriptionItem[]).find(i => i.value.length > bigWordLetterCount))
            bigLevels.push(level + 1);

        const big = bigLevels.includes(level);

        return (
            <DescriptionItemCard
                content={value}
                level={level}
                closable={level !== 0}
                big={big}
                highlight={props.highlight}
                key={item.id}>
                { !isTextType
                    ? item.items.map(item => generateTextItem(item as DescriptionItem, level + 1))
                    : generateTextItem(item.items as string[], level + 1)
                }
            </DescriptionItemCard>
        );
    };

    const generateBreadcrumbs = (item: DescriptionItem | string, initial: boolean = true): string[] => {
        if (typeof item === 'string' || typeof item.items[0] === 'string')
            return [];

        const crumbs = [
            item.items.map(i => typeof i === 'string' ? i : i.value)
                .map(s => s.length > 1 ? s : __('level', s))
                .join(', '),
            ...generateBreadcrumbs(item.items[0], false)
        ];

        if (initial)
            crumbs.unshift(item.value);

        return crumbs;
    };

    return (
        <div className={'description-item-block'}>
            <div className={'description-item-block__breadcrumbs'}>
                <span>{ generateBreadcrumbs(props.item).join(' > ') }</span>
            </div>

            { generateTextItem(props.item, props.start ?? 0) }
        </div>
    );
};

export default DescriptionItemBlock;
