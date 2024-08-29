// @ts-ignore
import masker from "../utils/mask/masker";
// @ts-ignore
import tokens from "../utils/mask/tokens";

function event (name: string) {
    const evt = document.createEvent('Event')
    evt.initEvent(name, true, true)
    return evt
}

export default function (el: HTMLInputElement, binding: any) {
    let config: string | { mask: string, tokens: any } | string[] = binding.value
    if (Array.isArray(config) || typeof config === 'string') {
        config = {
            mask: (config as string),
            tokens: tokens
        }
    }

    if (el.tagName.toLocaleUpperCase() !== 'INPUT') {
        const els = el.getElementsByTagName('input')
        if (els.length !== 1) {
            throw new Error("v-mask directive requires 1 input, found " + els.length)
        } else {
            el = els[0]
        }
    }

    el.oninput = function (evt: any) {
        if (!evt.isTrusted) return // avoid infinite loop
        // by default, keep cursor at same position as before the mask
        let position = el.selectionEnd || 0;
        // save the character just inserted
        const digit = el.value[position-1]
        el.value = masker(el.value, config.mask, true, config.tokens)
        // if the digit was changed, increment position until find the digit again
        while (position < el.value.length && el.value.charAt(position-1) !== digit) {
            position++
        }
        if (el === document.activeElement) {
            el.setSelectionRange(position, position)
            setTimeout(function () {
                el.setSelectionRange(position, position)
            }, 0)
        }
        el.dispatchEvent(event('input'))
    }

    const newDisplay = masker(el.value, config.mask, true, config.tokens)
    if (newDisplay !== el.value) {
        el.value = newDisplay
        el.dispatchEvent(event('input'))
    }
}
