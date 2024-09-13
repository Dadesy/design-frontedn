export interface ITheme {
    [key: string]: IThemeItem
}

export interface IThemeItem {
    mainColor: string,
    token: {
        [key: string]: string | number | boolean
    } | undefined
}

export const THEME_LIST: ITheme = {
    'По умолчанию': {
        mainColor: '#4079c9',
        token: {
            "colorPrimary": "#4079c9",
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
        }
    },
    'ИСУИ': {
        mainColor: '#148F2B',
        token: {
            "colorPrimary": "#058241",
            "colorInfo": "#8ac460",
            "controlOutline": "transparent",
            "colorPrimaryBg": "#8ac460",
            "colorPrimaryText": "#ffffff",
            "colorLogo": "#036231"
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
        }
    },
    "Digital solutions": {
        mainColor: '#ffe400',
        token: {
            "colorPrimary": "#000000",
            "colorPrimaryBg": "#ffe400",
            "controlOutline": "transparent",
            "colorPrimaryText": "#3e3e3e",
            "colorTextBase": "#1f1f1f",
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
        }
    }
}
