<template>
  <div class="relative h-screen w-full overflow-hidden bg-white">
    <!-- Animated Background Canvas -->
    <canvas
      ref="canvasRef"
      class="absolute inset-0 w-full h-full"
      @mousemove="handleMouseMove"
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
    />

    <!-- Content Overlay -->
    <div class="absolute inset-0 flex flex-col items-center justify-center px-4 z-10">
      <div
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }"
        class="text-center max-w-4xl"
      >
        <h1 class="text-5xl md:text-6xl lg:text-8xl font-bold text-gray-900 mb-6">
          Discover Your
        </h1>
         <h1 class="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
           <span class="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">Perfect Stay</span>
        </h1>
        
        <p class="text-lg md:text-xl text-gray-700 mb-12 leading-relaxed max-w-2xl mx-auto">
          Explore thousands of incredible homes and experiences worldwide. Find your next adventure with StaySuite.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            v-motion
            :initial="{ opacity: 0, x: -20 }"
            :enter="{ opacity: 1, x: 0, transition: { duration: 800, delay: 200 } }"
            @click="navigateToListings"
            class="bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-red-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 flex items-center gap-2 text-lg"
          >
            <Icon name="fa6-solid:search" class="text-[20px]" />
            Explore Stays
          </button>
          
          <button
            v-motion
            :initial="{ opacity: 0, x: 20 }"
            :enter="{ opacity: 1, x: 0, transition: { duration: 800, delay: 200 } }"
            @click="navigateToHosting"
            class="border-2 border-rose-600 text-rose-600 hover:bg-rose-50 font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 text-lg"
          >
            <Icon name="fa6-solid:house" class="text-[20px]" />
            Become a Host
          </button>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div
        v-motion
        :initial="{ opacity: 0, y: -20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 400 } }"
        class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
      >
        <div class="flex flex-col items-center gap-2">
          <span class="text-sm text-gray-600 font-medium">Scroll to explore</span>
          <Icon name="fa6-solid:chevron-down" class="text-rose-600 text-[24px]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const canvasRef = ref(null);
const timeRef = ref(0);
const animationFrameId = ref(null);
const mouseRef = ref({ x: 0, y: 0, isDown: false });
const transitionBursts = ref([]);
const dprRef = ref(1);

const backgroundColor = '#FFFFFF';
const lineColor = '#FDA4AF';
const barColor = '#BE123C';
const lineWidth = 1.5;
const animationSpeed = 0.004;

const noise = (x, y, t) => {
  const n =
    Math.sin(x * 0.02 + t) * Math.cos(y * 0.02 + t) +
    Math.sin(x * 0.03 - t) * Math.cos(y * 0.01 + t);
  return (n + 1) / 2;
};

const getMouseInfluence = (x, y) => {
  const dx = x - mouseRef.value.x;
  const dy = y - mouseRef.value.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const maxDistance = 200;
  return Math.max(0, 1 - distance / maxDistance);
};

const getTransitionBurstInfluence = (x, y, currentTime) => {
  let totalInfluence = 0;
  transitionBursts.value.forEach((burst) => {
    const age = currentTime - burst.time;
    const maxAge = 2500;
    if (age < maxAge) {
      const dx = x - burst.x;
      const dy = y - burst.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const burstRadius = (age / maxAge) * 300;
      const burstWidth = 60;
      if (Math.abs(distance - burstRadius) < burstWidth) {
        const burstStrength = (1 - age / maxAge) * burst.intensity;
        const proximityToBurst =
          1 - Math.abs(distance - burstRadius) / burstWidth;
        totalInfluence += burstStrength * proximityToBurst;
      }
    }
  });
  return Math.min(totalInfluence, 1.5);
};

const generatePattern = (seed, width, height, numLines) => {
  const pattern = [];
  const lineSpacing = width / numLines;
  for (let i = 0; i < numLines; i++) {
    const lineBars = [];
    let currentY = 0;
    while (currentY < height) {
      const noiseVal = noise(i * lineSpacing, currentY, seed);
      if (noiseVal > 0.5) {
        const barLength = 8 + noiseVal * 25;
        const barWidth = 1.5 + noiseVal * 2.5;
        lineBars.push({
          y: currentY + barLength / 2,
          height: barLength,
          width: barWidth,
        });
        currentY += barLength + 15;
      } else {
        currentY += 15;
      }
    }
    pattern.push(lineBars);
  }
  return pattern;
};

const resizeCanvas = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const dpr = window.devicePixelRatio || 1;
  dprRef.value = dpr;
  const displayWidth = window.innerWidth;
  const displayHeight = window.innerHeight;
  canvas.width = displayWidth * dpr;
  canvas.height = displayHeight * dpr;
  canvas.style.width = displayWidth + 'px';
  canvas.style.height = displayHeight + 'px';
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.scale(dpr, dpr);
  }
};

const handleMouseMove = (e) => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  mouseRef.value.x = e.clientX - rect.left;
  mouseRef.value.y = e.clientY - rect.top;
};

const handleMouseDown = (e) => {
  mouseRef.value.isDown = true;
  const canvas = canvasRef.value;
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  transitionBursts.value.push({
    x,
    y,
    time: Date.now(),
    intensity: 2,
  });
  const now = Date.now();
  transitionBursts.value = transitionBursts.value.filter(
    (burst) => now - burst.time < 2500
  );
};

const handleMouseUp = () => {
  mouseRef.value.isDown = false;
};

const animate = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const currentTime = Date.now();
  timeRef.value += animationSpeed;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const numLines = Math.floor(width / 18);
  const lineSpacing = width / numLines;
  const pattern1 = generatePattern(0, width, height, numLines);
  const pattern2 = generatePattern(5, width, height, numLines);
  const baseCycleTime = timeRef.value % (Math.PI * 2);
  const mouseInfluenceOnCycle =
    getMouseInfluence(width / 2, height / 2) * 0.5;
  let easingFactor;
  const adjustedCycleTime = baseCycleTime + mouseInfluenceOnCycle;
  if (adjustedCycleTime < Math.PI * 0.1) {
    easingFactor = 0;
  } else if (adjustedCycleTime < Math.PI * 0.9) {
    const transitionProgress =
      (adjustedCycleTime - Math.PI * 0.1) / (Math.PI * 0.8);
    easingFactor = transitionProgress;
  } else if (adjustedCycleTime < Math.PI * 1.1) {
    easingFactor = 1;
  } else if (adjustedCycleTime < Math.PI * 1.9) {
    const transitionProgress =
      (adjustedCycleTime - Math.PI * 1.1) / (Math.PI * 0.8);
    easingFactor = 1 - transitionProgress;
  } else {
    easingFactor = 0;
  }
  const smoothEasing =
    easingFactor < 0.5
      ? 4 * easingFactor * easingFactor * easingFactor
      : 1 - Math.pow(-2 * easingFactor + 2, 3) / 2;
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);
  for (let i = 0; i < numLines; i++) {
    const x = i * lineSpacing + lineSpacing / 2;
    const lineMouseInfluence = getMouseInfluence(x, height / 2);
    ctx.beginPath();
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth + lineMouseInfluence * 2;
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
    const bars1 = pattern1[i] || [];
    const bars2 = pattern2[i] || [];
    const maxBars = Math.max(bars1.length, bars2.length);
    for (let j = 0; j < maxBars; j++) {
      let bar1 = bars1[j];
      let bar2 = bars2[j];
      if (!bar1) bar1 = { y: bar2.y - 100, height: 0, width: 0 };
      if (!bar2) bar2 = { y: bar1.y + 100, height: 0, width: 0 };
      const barMouseInfluence = getMouseInfluence(x, bar1.y);
      const burstInfluence = getTransitionBurstInfluence(
        x,
        bar1.y,
        currentTime
      );
      const baseWaveOffset =
        Math.sin(i * 0.3 + j * 0.5 + timeRef.value * 2) *
        8 *
        (smoothEasing * (1 - smoothEasing) * 4);
      const mouseWaveOffset =
        barMouseInfluence * Math.sin(timeRef.value * 3 + i * 0.2) * 12;
      const burstWaveOffset =
        burstInfluence * Math.sin(timeRef.value * 4 + j * 0.3) * 15;
      const totalWaveOffset =
        baseWaveOffset + mouseWaveOffset + burstWaveOffset;
      const y = bar1.y + (bar2.y - bar1.y) * smoothEasing + totalWaveOffset;
      const height =
        bar1.height +
        (bar2.height - bar1.height) * smoothEasing +
        barMouseInfluence * 4 +
        burstInfluence * 6;
      const width =
        bar1.width +
        (bar2.width - bar1.width) * smoothEasing +
        barMouseInfluence * 1.5 +
        burstInfluence * 2.5;
      if (height > 0.1 && width > 0.1) {
        const intensity = Math.min(
          1,
          0.7 + barMouseInfluence * 0.2 + burstInfluence * 0.3
        );
        const red = parseInt(barColor.slice(1, 3), 16);
        const green = parseInt(barColor.slice(3, 5), 16);
        const blue = parseInt(barColor.slice(5, 7), 16);
        ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${intensity})`;
        ctx.fillRect(x - width / 2, y - height / 2, width, height);
      }
    }
  }
  animationFrameId.value = requestAnimationFrame(animate);
};

const navigateToListings = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const navigateToHosting = () => {
  // Navigate to hosting page
};

onMounted(() => {
  resizeCanvas();
  const handleResize = () => resizeCanvas();
  window.addEventListener('resize', handleResize);
  animate();
});

onUnmounted(() => {
  if (animationFrameId.value) {
    cancelAnimationFrame(animationFrameId.value);
  }
});
</script>
