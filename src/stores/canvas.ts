import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { mainloop, onClickCanvas } from '@/game';

export const useDrawingCanvas = defineStore('drawing_canvas', () => {
    const canvas = ref<HTMLCanvasElement | null>(null);

    const context = computed(() => {
        const ctx = canvas.value?.getContext('2d');

        if (ctx) ctx.imageSmoothingEnabled = false;

        return ctx;
    });

    // const resizeWindow = () => {
    //     if (!canvas.value) return;

    //     canvas.value.width = 800;
    //     canvas.value.height = 800;
    //     canvas.value.style.width = `800px`;
    //     canvas.value.style.height = `800px`;
    // };

    // window.addEventListener('resize', () => {
    //     resizeWindow();
    // });

    const setCanvas = (_n_canvas: HTMLCanvasElement) => {
        canvas.value = _n_canvas;
        // resizeWindow();
        canvas.value.addEventListener('click', (e) => onClickCanvas(e, canvas.value!));
        requestAnimationFrame(startMainLoop);
    };

    let lastTime: number | null = null;

    const startMainLoop = (time: number) => {
        if (!context.value) return;

        const delta = time - (lastTime || time);

        lastTime = time;

        mainloop(delta / 1000, context.value);
        requestAnimationFrame(startMainLoop);
    };

    return { canvas, context, setCanvas };
});
