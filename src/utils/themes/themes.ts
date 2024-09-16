import type { AliasToken } from "ant-design-vue/es/theme/interface"

export interface ITheme {
    [key: string]: IThemeItem
}

export interface IThemeItem {
    mainColor: string,
    token: {
        [key: string]: string | number | boolean
    } | undefined
}

export interface ICustomColors extends AliasToken {
    colorLogo: string;
    colorSelectedMenu: string;
    mainBgColor: string;
}

export const THEME_LIST: ITheme = {
    'По умолчанию': {
        mainColor: '#4079c9',
        token: {
            "colorPrimary": "#4079c9",
            "colorSelectedMenu": "#4079c9",
        }
    },
    'Соц сеть ЭФКО': {
        mainColor: '#0f766e',
        token: {
            "borderRadius": 6,
            "colorPrimary": "#0f766e",
            "colorInfo": "#0f766e",
            "colorPrimaryBg": "#edf3f3",
            "controlOutline": "transparent",
            "colorSelectedMenu": "#0f766e"
        }
    },
    'ИСУИ': {
        mainColor: '#148F2B',
        token: {
            "colorPrimary": "#78c11a",
            "colorInfo": "#8ac460",
            "controlOutline": "transparent",
            "colorPrimaryBg": "#8ac460",
            "colorPrimaryText": "#ffffff",
            "colorLogo": "#036231",
            "colorSelectedMenu": "#036231",
            "mainBgColor": "#d8ecb1"
        },
    },
    'QMoex': {
        mainColor: '#805dca',
        token: {
            "colorPrimary": "#805dca",
            "colorInfo": "#805dca",
            "colorTextBase": "#1f2937",
            "wireframe": false,
            "colorBgBase": "#ffffff",
            "borderRadius": 6,
            "controlOutline": "transparent",
            "colorSelectedMenu": "#805dca"
        }
    },
    "Digital solutions": {
        mainColor: '#ffe400',
        token: {
            "colorPrimary": "#5f5f5f",
            "colorPrimaryBg": "#fcfc6f",
            "controlOutline": "transparent",
            "colorPrimaryText": "#3e3e3e",
            "colorTextBase": "#1f1f1f",
            "colorSelectedMenu": "#5f5f5f"
        }
    },
    "Темная": {
        mainColor: '#4c5158',
        token: {
            "colorPrimary": "#4c5158",
            "colorPrimaryText": "#B9BBBE",
            "colorBorder": "rgba(255, 255, 255, 0.12)",
            "controlOutline": "transparent",
            "colorBorderSecondary": "rgba(255, 255, 255, 0.12)",
            "colorText": "#eeeeee",
            "colorInfo": "#73767C",
            "colorTextBase": "#B9BBBE",
            "wireframe": false,
            "colorBgBase": "#37393E",
            "borderRadius": 6,
            "sizeStep": 4,
            "sizeUnit": 4,
            "controlItemBgActive": "#2d2f33",
            "colorPrimaryBg": "#2d2f33",
            "colorSelectedMenu": "#B9BBBE"
        }
    }
}
