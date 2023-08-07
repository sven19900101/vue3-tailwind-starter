<template>
  <div
    class="relative min-h-screen w-full bg-cover bg-no-repeat"
    :style="`background-image: url(${luckyBg})`"
  >
    <div class="flex w-full justify-center pt-4">
      <img class="w-[70%]" :src="luckyTitle" alt="" />
    </div>
    <div class="flex w-full justify-center">
      <div
        class="h-[60px] w-[80%] animate-bounce bg-cover text-center text-[24px] leading-[50px] text-[#fbe9ce]"
        :style="`background-image: url(${luckyRibbon})`"
      >
        ลุ้นโชค
      </div>
    </div>
    <div class="relative mt-[2rem] w-full">
      <div class="relative left-[7.5vw] w-[85%]">
        <img :src="luckyBox" alt="" />
        <div
          class="absolute left-[2px] top-[8%] flex h-[90%] w-[10px] flex-col justify-around"
        >
          <div
            v-for="item in 10"
            :class="[item % 2 == 1 ? 'dot-l' : 'dot-h', 'dot']"
          ></div>
        </div>
        <div class="absolute left-[5%] top-[25px] flex w-[90%] justify-around">
          <div
            v-for="item in 10"
            :class="[item % 2 == 0 ? 'dot-l' : 'dot-h', 'dot']"
          ></div>
        </div>
        <div
          class="absolute right-[2px] top-[8%] flex h-[90%] w-[10px] flex-col justify-around"
        >
          <div
            v-for="item in 10"
            :class="[item % 2 == 1 ? 'dot-l' : 'dot-h', 'dot']"
          ></div>
        </div>
        <div
          class="absolute bottom-[5px] left-[5%] flex w-[90%] justify-around"
        >
          <div
            v-for="item in 10"
            :class="[item % 2 == 0 ? 'dot-l' : 'dot-h', 'dot']"
          ></div>
        </div>
      </div>
      <LuckyGrid
        class="absolute left-[15vw] top-[14vw]"
        ref="myLucky"
        width="70vw"
        height="70vw"
        :rows="3"
        :cols="3"
        :blocks="blocks"
        :prizes="prizes"
        :buttons="buttons"
        :defaultConfig="defaultConfig"
        :defaultStyle="defaultStyle"
        @start="startCallback"
        @end="endCallback"
      />
    </div>
    <div class="relative -mt-2 flex w-full justify-center pb-5">
      <div class="w-[300px]">
        <img :src="luckyBottomBtn" alt="" />
        <div
          @click="startCallback"
          class="absolute left-[50%] top-[15%] -ml-[60px] w-[120px] text-center text-[18px] text-[#ea3323]"
        >
          เริ่มจับสลาก
        </div>
      </div>
    </div>
    <van-dialog :show-confirm-button="false" v-model:show="show">
      <div class="relative h-[450px] w-full">
        <div class="absolute right-0 top-0 z-10">
          <van-icon @click="closeModal" color="#fff" size="40" name="cross" />
        </div>
        <div class="absolute top-10 flex w-full items-end justify-center">
          <img :src="luckyModal" alt="" />
          <div class="absolute right-11 top-[12%] text-[28px] text-[#fbe9ce]">
            ว้าว! ชนะ!
          </div>
        </div>

        <div class="absolute bottom-[18%] flex w-full justify-center">
          <div
            @click="handleDownLoad"
            class="h-14 w-52 animate-bounce bg-contain bg-center bg-no-repeat text-center text-[22px] leading-[3.5rem] text-[#ca4120]"
            :style="`background-image: url(${luckyBtn})`"
          >
            下载app
          </div>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import luckyBg from "@/assets/imgs/lucky-bg.png";
import luckyGift1 from "@/assets/imgs/lucky-gift1.png";
import luckyGift2 from "@/assets/imgs/lucky-gift2.png";
import luckyPrizeBg from "@/assets/imgs/lucky-prize-bg.png";
import luckyBtnBg from "@/assets/imgs/lucky-btn-bg.png";
import luckyPrizeActiveBg from "@/assets/imgs/lucky-prize-active-bg.png";
import luckyModal from "@/assets/imgs/lucky-modal.png";
import luckyBtn from "@/assets/imgs/lucky-btn.png";
import luckyBox from "@/assets/imgs/lucky-prize-box.png";
import luckyTitle from "@/assets/imgs/lucky-title.png";
import luckyBottomBtn from "@/assets/imgs/lucky-bottom-btn.png";
import luckyRibbon from "@/assets/imgs/lucky-ribbon.png";

import { useOrderStore } from "@/store/order";
let blocks = ref([]);
let show = ref(false);
let prizes = ref([
  {
    x: 0,
    y: 0,
    fonts: [
      {
        fontColor: "#ca774a",
        text: "奖品名称",
        fontSize: "12px",
        top: "75%",
      },
    ],
    imgs: [
      {
        src: luckyPrizeBg,
        width: "22vw",
        activeSrc: luckyPrizeActiveBg,
      },
      {
        src: luckyGift1,
        width: "14vw",
        top: "10%",
      },
    ],
  },
  {
    x: 1,
    y: 0,
    fonts: [
      {
        fontColor: "#ca774a",
        text: "奖品名称",
        fontSize: "12px",
        top: "75%",
      },
    ],
    imgs: [
      {
        src: luckyPrizeBg,
        width: "22vw",
        activeSrc: luckyPrizeActiveBg,
      },
      {
        src: luckyGift2,
        width: "14vw",
        top: "10%",
      },
    ],
  },
  {
    x: 2,
    y: 0,
    fonts: [
      {
        fontColor: "#ca774a",
        text: "奖品名称",
        fontSize: "12px",
        top: "75%",
      },
    ],
    imgs: [
      {
        src: luckyPrizeBg,
        width: "22vw",
        activeSrc: luckyPrizeActiveBg,
      },
      {
        src: luckyGift1,
        width: "14vw",
        top: "10%",
      },
    ],
  },
  {
    x: 2,
    y: 1,
    fonts: [
      {
        fontColor: "#ca774a",
        text: "奖品名称",
        fontSize: "12px",
        top: "75%",
      },
    ],
    imgs: [
      {
        src: luckyPrizeBg,
        width: "22vw",
        activeSrc: luckyPrizeActiveBg,
      },
      {
        src: luckyGift2,
        width: "14vw",
        top: "10%",
      },
    ],
  },
  {
    x: 2,
    y: 2,
    fonts: [
      {
        fontColor: "#ca774a",
        text: "奖品名称",
        fontSize: "12px",
        top: "75%",
      },
    ],
    imgs: [
      {
        src: luckyPrizeBg,
        width: "22vw",
        activeSrc: luckyPrizeActiveBg,
      },
      {
        src: luckyGift1,
        width: "14vw",
        top: "10%",
      },
    ],
  },
  {
    x: 1,
    y: 2,
    fonts: [
      {
        fontColor: "#ca774a",
        text: "奖品名称",
        fontSize: "12px",
        top: "75%",
      },
    ],
    imgs: [
      {
        src: luckyPrizeBg,
        width: "22vw",
        activeSrc: luckyPrizeActiveBg,
      },
      {
        src: luckyGift2,
        width: "14vw",
        top: "10%",
      },
    ],
  },
  {
    x: 0,
    y: 2,
    fonts: [
      {
        fontColor: "#ca774a",
        text: "奖品名称",
        fontSize: "12px",
        top: "75%",
      },
    ],
    imgs: [
      {
        src: luckyPrizeBg,
        width: "22vw",
        activeSrc: luckyPrizeActiveBg,
      },
      {
        src: luckyGift1,
        width: "14vw",
        top: "10%",
      },
    ],
  },
  {
    x: 0,
    y: 1,
    fonts: [
      {
        fontColor: "#ca774a",
        text: "奖品名称",
        fontSize: "12px",
        top: "75%",
      },
    ],
    imgs: [
      {
        src: luckyPrizeBg,
        width: "22vw",
        activeSrc: luckyPrizeActiveBg,
      },
      {
        src: luckyGift2,
        width: "14vw",
        top: "10%",
      },
    ],
  },
]);
let orderStore = useOrderStore();
let buttons = ref([
  {
    x: 1,
    y: 1,
    imgs: [
      {
        src: luckyBtnBg,
        width: "22vw",
      },
    ],
    fonts: [
      { text: "เริ่ม", top: "20%", fontColor: "#fbe9ce" },
      {
        text: `${orderStore.remainTime}/${orderStore.totalLucyTime}`,
        top: "55%",
        fontColor: "#fbe9ce",
        fontSize: "14px",
      },
    ],
  },
]);
let myLucky = ref(null);
let defaultStyle = reactive({});
let defaultConfig = reactive({
  speed: 10,
  accelerationTime: 2000,
  decelerationTime: 4000,
});

// 点击抽奖按钮会触发star回调
const startCallback = () => {
  // 调用抽奖组件的play方法开始游戏
  if (orderStore.remainTime > 0) {
    myLucky.value.play();
    // 模拟调用接口异步抽奖
    buttons.value = [
      {
        ...buttons.value[0],
        fonts: [
          {
            text: "ในลอตเตอรี",
            top: "20%",
            fontColor: "#fbe9ce",
          },
          {
            text: "...",
            top: "50%",
            fontColor: "#fbe9ce",
          },
        ],
      },
    ];
    setTimeout(() => {
      // 假设后端返回的中奖索引是0
      const index = Math.floor(Math.random() * 8);
      // 调用stop停止旋转并传递中奖索引

      myLucky.value.stop(index);
    }, 3000);
  }
};
// 抽奖结束会触发end回调
const endCallback = (prize) => {
  orderStore.setRemainTime(orderStore.remainTime - 1);
  buttons.value = [
    {
      ...buttons.value[0],
      fonts: [
        {
          text: "ยินดีด้วย",
          top: "20%",
          fontColor: "#fbe9ce",
        },
        {
          text: "ถูกหวย",
          top: "50%",
          fontColor: "#fbe9ce",
        },
      ],
    },
  ];
  show.value = true;
  console.log(prize);
};
const closeModal = () => {
  show.value = false;
  if (orderStore.remainTime > 0) {
    buttons.value = [
      {
        ...buttons.value[0],
        fonts: [
          { text: "เริ่ม", top: "20%", fontColor: "#fbe9ce" },
          {
            text: `${orderStore.remainTime}/${orderStore.totalLucyTime}`,
            top: "55%",
            fontColor: "#fbe9ce",
            fontSize: "14px",
          },
        ],
      },
    ];
  }
};

const handleDownLoad = () => {};
</script>

<style scoped>
:deep() .van-dialog {
  background-color: transparent;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 100%;
}
.dot-h {
  animation: flashH 0.8s infinite;
}
.dot-l {
  animation: flashL 0.8s infinite;
}
@keyframes flashH {
  from {
    background-color: #d97706;
  }
  to {
    background-color: #fbe5c2;
  }
}
@keyframes flashL {
  from {
    background-color: #fbe5c2;
  }
  to {
    background-color: #d97706;
  }
}
</style>
