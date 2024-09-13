import type { DirectiveBinding } from 'vue';

export default {
    mounted(el: HTMLInputElement, binding: DirectiveBinding, vnode: any) {
        el.value = binding.value;
        el.addEventListener('input', (event) => {
            const value = (event.target as HTMLInputElement).value;


        });
    },

    // updated(el: HTMLInputElement, binding: DirectiveBinding) {
    //     el.value = binding.value;
    // }
    // mounted(el: HTMLInputElement, binding: DirectiveBinding) {
    //     console.log(666, binding);
    //     const key: string = binding.arg as string;
    //     let savedValue: string | null = localStorage.getItem(key);

    //     if (savedValue) {
    //         el.value = savedValue;
    //     }

    //     const onInput = (event: Event) => {
    //         const target = event.target as HTMLInputElement;
    //         if (target.value.length > 0) {
    //             localStorage.setItem(key, target.value);
    //             savedValue = target.value;
    //             return;
    //         }

    //         localStorage.removeItem(key);
    //         savedValue = null;
    //     };

    //     const addValue = () => {
    //         if (savedValue) {
    //             el.value = savedValue;
    //         }
    //     }

    //     el.addEventListener('input', onInput);
    //     el.addEventListener('focus', addValue);
    //     el.addEventListener('blur', addValue);

    //     (el as any)._onInput = onInput;
    // },
};