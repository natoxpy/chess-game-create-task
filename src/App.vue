<script setup lang="ts">
import { useDrawingCanvas } from '@/stores/canvas';
import { onMounted } from 'vue';

const drawingCanvas = useDrawingCanvas();

onMounted(() => {
    drawingCanvas.setCanvas(document.getElementById('main_canvas') as HTMLCanvasElement);
});
</script>

<template>
    <main>
        <div class="center-div">
            <canvas id="main_canvas" width="600" height="600"></canvas>
        </div>
    </main>
</template>

<style scoped>
canvas {
    border: 1px solid black;
    image-rendering: pixelated;
    width: 600px;
    height: 600px;
}

.center-div {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
