<template>
  <div class="Audio">
    <div class="left" @click="show = true">
      <div class="play" :style="{ animationPlayState: audioData.isPlay ? 'running' : 'paused' }">
        <img :src="disc" alt="唱片" class="discImg">
        <img v-lazy="audioData.song.al.picUrl + '?param=50y50'" alt="图片" class="songImg">
      </div>
    </div>
    <div class="center nowrap" @click="show = true">
      {{ audioData.song.name }}<span class="alia" v-if="audioData.song.alia[0]">（{{ audioData.song.alia[0] }}）</span>
    </div>
    <div class="right">
      <!-- 播放中 -->
      <svg v-if="audioData.isPlay" t="1668173002562" class="icon" viewBox="0 0 1024 1024" version="1.1"
        xmlns="http://www.w3.org/2000/svg" p-id="6132" width="20" height="20" @click="play(false)">
        <path
          d="M426.666667 138.666667v746.666666a53.393333 53.393333 0 0 1-53.333334 53.333334H266.666667a53.393333 53.393333 0 0 1-53.333334-53.333334V138.666667a53.393333 53.393333 0 0 1 53.333334-53.333334h106.666666a53.393333 53.393333 0 0 1 53.333334 53.333334z m330.666666-53.333334H650.666667a53.393333 53.393333 0 0 0-53.333334 53.333334v746.666666a53.393333 53.393333 0 0 0 53.333334 53.333334h106.666666a53.393333 53.393333 0 0 0 53.333334-53.333334V138.666667a53.393333 53.393333 0 0 0-53.333334-53.333334z"
          fill="var(--font-color-5)" p-id="6133"></path>
      </svg>
      <!-- 暂停 -->
      <svg v-else t="1668172936808" class="icon" viewBox="0 0 1024 1024" version="1.1"
        xmlns="http://www.w3.org/2000/svg" p-id="5876" width="20" height="20" @click="play(true)">
        <path
          d="M870.2 466.333333l-618.666667-373.28a53.333333 53.333333 0 0 0-80.866666 45.666667v746.56a53.206667 53.206667 0 0 0 80.886666 45.666667l618.666667-373.28a53.333333 53.333333 0 0 0 0-91.333334z"
          fill="var(--font-color-5)" p-id="5877"></path>
      </svg>
      <!-- 播放列表图标 -->
      <PlayListIcon :size="21" />
    </div>
    <!-- 播放弹出框 -->
    <van-popup v-model:show="show" position="bottom" :style="{ height: '100%' }">
      <div class="background" :style="{ backgroundImage: `url(${audioData.song.al.picUrl + '?param=50y50'})` }">
        <div class="popup">
          <!-- 顶栏 -->
          <div class="popup__top">
            <div class="popup__top__left" @click="show = false">
              <van-icon name="arrow-down" size="24" />
            </div>
            <div class="popup__top__center">
              <span class="title">
                {{ audioData.song.name }}
                <span v-if="audioData.song.alia[0]">（{{ audioData.song.alia[0] }}）</span>
              </span>
              <span class="artist">
                <span class="artist__item">
                  <span v-for="item in audioData.song.ar" @click="routerPush('artistListDetail', { id: item.id })">
                    {{ item.name }}
                  </span>
                </span>
                <van-icon name="arrow" />
              </span>
            </div>
            <div class="popup__top__right">
              <van-icon name="share-o" size="24" />
            </div>
          </div>
          <!-- 可切换唱片和歌词 -->
          <div class="popup__center">
            <!-- 唱片 -->
            <Transition>
              <div class="popup__center__disc" v-show="showLyric == false" @click="showLyric = true">
                <img class="pointer" :src="pointer" alt="指针"
                  :style="audioData.isPlay ? 'transform: translateX(-10px) rotate(0deg)' : 'transform: translateX(-10px) rotate(-20deg)'">
                <img class="disc" :src="disc" alt="唱片">
                <img class="cover" v-lazy="audioData.song.al.picUrl + '?param=250y250'" alt="封面"
                  :style="audioData.isPlay ? 'animation-play-state: running' : 'animation-play-state: paused'" />
              </div>
            </Transition>
            <!-- 歌词 -->
            <Transition>
              <div class="popup__center__lyric">
                <!-- 顶部功能 -->
                <div class="top__setting">
                  <div class="top__setting__left">
                    <van-icon name="volume-o" size="22px" />
                  </div>
                  <div class="top__setting__right">
                    <van-icon name="font-o" size="22px" />
                  </div>
                </div>
                <!-- 歌词时间线 -->
                <div v-show="showTimeline == true" class="timeline">
                  <van-icon name="play" size="22px" />
                  <span class="timeline__line"></span>
                  <span>{{ formatTime(currentTime) }}</span>
                </div>
                <!-- 歌词页 -->
                <ul class="lyric" v-show="showLyric == true" @click="showLyric = false" @touchstart="touchstartHandle"
                  @touchend="touchendHandle">
                  <li class="lyric__item" v-for="(item, index) in audioData.lyric" :key="index"
                    :class="{ activeLyric: currentIndex == index }" :style="{ fontSize: defaultFontSize + 3 + 'px' }">
                    <span>{{ item.text }}</span>
                    <span v-show="showLyricType == 1" :style="{ fontSize: defaultFontSize + 1 + 'px' }">
                      {{ item.tlyric }}
                    </span>
                    <span v-show="showLyricType == 2" :style="{ fontSize: defaultFontSize + 1 + 'px' }">
                      {{ item.romalrc }}
                    </span>
                  </li>
                </ul>
                <!-- 底部功能 -->
                <div class="bottom__setting">
                  <div class="bottom__setting__left">
                    <!-- mv详情页跳转 -->
                    <MVIcon v-if="audioData.song.mv" :mvid="audioData.song.mv" color="currentColor"
                      @click="show = false" :size="28" />
                    <!-- 音质切换 -->
                    <MusicQualityIcon :song="audioData.song" :active="audioData.level" @switch="switchQuality" />
                  </div>
                  <div class="bottom__setting__right">
                    <!-- 歌词切换 -->
                    <div class="translateLyric" @click="switchLyricType"
                      v-if="audioData.haveTlyric || audioData.haveRomalrc">
                      <span v-if="audioData.haveTlyric == true"
                        :style="{ color: showLyricType == 1 ? '#fff' : '' }">译</span>
                      <span v-if="audioData.haveRomalrc == true"
                        :style="{ color: showLyricType == 2 ? '#fff' : '' }">音</span>
                    </div>
                    <!-- 更多设置 -->
                    <van-icon name="more-o" size="24px" @click="showMoreSetting = true" />
                    <van-action-sheet v-model:show="showMoreSetting" teleport="body">
                      <div class="lyricMoreSetting nowrap">
                        <span class="lyricMoreSetting__title">更多</span>
                        <div class="lyricMoreSetting__line"></div>
                        <div class="lyricMoreSetting__item">
                          <div class="lyricMoreSetting__item__left">
                            <van-icon name="font-o" size="22px" />
                            <span>调整歌词字体大小</span>
                          </div>
                          <van-stepper v-model="defaultFontSize" :disable-input="true" :min="12" :max="24" />
                        </div>
                        <div class="lyricMoreSetting__item">
                          <div class="lyricMoreSetting__item__left">
                            <van-icon name="underway-o" size="22px" />
                            <span>歌词时间调整</span>
                          </div>
                          <van-stepper v-model.number="defaultLyricTime" :default-value="0" :step="0.1" :min="-5"
                            :max="5" :decimal-length="1" />
                        </div>
                      </div>
                    </van-action-sheet>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
          <!-- 控制器和进度条 -->
          <div class="popup__bottom">
            <!-- 播放进度条 -->
            <div class="progress">
              <span class="progress__time">{{ formatTime(currentTime) }}</span>
              <van-slider v-model="currentTime" @change="onChange" :min="0" :max="(audioData.song.dt / 1000)"
                bar-height="4px" active-color="#fff" inactive-color="#ffffff58">
                <template #button>
                  <div class="custom-button"></div>
                </template>
              </van-slider>
              <span class="progress__time">{{ formatTime(audioData.song.dt / 1000) }}</span>
            </div>
            <!-- 播放控制器 -->
            <div class="controller">
              <!-- 顺序播放 -->
              <svg v-show="audioData.playMode == 'order'" t="1669274031983" class="icon" viewBox="0 0 1024 1024"
                version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1132" width="28" height="28">
                <path
                  d="M905.615621 524.965532c0-132.931319-65.364876-256.560237-174.885151-331.940698v-0.031008c-1.24032-0.868224-2.356608-1.922496-3.627936-2.790721l-0.248064 0.403105a30.573893 30.573893 0 0 0-18.480771-5.891522 31.256069 31.256069 0 0 0-29.953734 32.465382 30.635909 30.635909 0 0 0 14.232675 24.341284l-0.124032 0.186049a340.839996 340.839996 0 0 1 151.071002 283.289137c0 185.272833-148.559354 336.188795-332.777914 340.653948l39.194119-39.194119a30.759941 30.759941 0 0 0 11.752034-22.821892 31.225061 31.225061 0 0 0-29.953734-32.465381 30.728933 30.728933 0 0 0-23.876164 10.356673l-0.372096-0.372096-116.5901 116.652117 116.90018 113.582324 0.31008-0.31008a30.697925 30.697925 0 0 0 23.6281 13.147394 31.256069 31.256069 0 0 0 32.403366-30.015749 30.914981 30.914981 0 0 0-13.860578-26.542853l0.744192-0.7752-40.341415-39.225127c218.451398-4.434145 394.855941-183.164288 394.855941-402.669959M487.410652 184.652672l-38.139847 37.085575 0.744192 0.7752a30.759941 30.759941 0 0 0-13.860578 26.542853c0.682176 17.240451 15.162915 30.697925 32.403365 29.984741a30.697925 30.697925 0 0 0 23.628101-13.116386l0.279072 0.31008 116.869172-113.582324-116.528084-116.590101-0.372096 0.31008a30.697925 30.697925 0 0 0-23.907173-10.325665c-17.209443 0.651168-30.604901 15.193923-29.953733 32.434373a30.945989 30.945989 0 0 0 11.876066 22.883908l41.054599 41.085608C274.323638 128.373143 99.407479 306.42111 99.407479 524.99654c0 134.109624 66.450156 259.071886 177.675872 334.266299l34.728966-51.411273a340.964028 340.964028 0 0 1-150.388827-282.855026c0-182.947232 144.931417-332.343802 325.987162-340.343868"
                  p-id="1133" fill="currentColor"></path>
              </svg>
              <!-- 随机播放 -->
              <svg v-show="audioData.playMode == 'random'" t="1669274050606" class="icon" viewBox="0 0 1063 1024"
                version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1286" width="28" height="28">
                <path
                  d="M911.478154 682.653538a38.990769 38.990769 0 0 0-30.326154-13.115076c-21.897846 0.827077-38.912 19.298462-38.084923 41.196307 0.472615 11.933538 6.380308 22.055385 14.966154 28.987077l47.182769 47.222154a289.201231 289.201231 0 0 1-139.264-61.794462L331.697231 257.063385A369.388308 369.388308 0 0 0 53.956923 131.150769a39.384615 39.384615 0 1 0 0 78.769231h0.039385c83.652923 0 163.249231 36.115692 219.214769 99.879385l433.624615 468.007384 8.27077 7.483077a369.664 369.664 0 0 0 194.048 81.762462l-52.539077 51.081846 0.984615 0.945231a39.069538 39.069538 0 0 0-17.604923 33.71323c0.866462 21.897846 19.298462 38.990769 41.156923 38.124308a38.912 38.912 0 0 0 29.971692-16.699077l0.393846 0.393846 148.48-144.226461-148.046769-148.204308-0.472615 0.472615z"
                  p-id="1287" fill="currentColor"></path>
                <path
                  d="M911.163077 30.759385a38.990769 38.990769 0 0 0-30.011077-16.699077 39.660308 39.660308 0 0 0-41.117538 38.124307 38.990769 38.990769 0 0 0 17.604923 33.673847l-0.984616 1.024 48.600616 47.261538a366.08 366.08 0 0 0-217.481847 106.259692l-128.551384 139.34277 0.196923 0.196923a38.990769 38.990769 0 0 0-10.633846 26.505846 39.384615 39.384615 0 0 0 39.384615 39.384615 38.990769 38.990769 0 0 0 28.750769-12.878769l0.196923 0.196923 126.582154-137.294769a287.665231 287.665231 0 0 1 166.675693-82.944l-52.224 52.302769a39.108923 39.108923 0 0 0-15.044923 29.026462c-0.866462 21.897846 16.147692 40.329846 38.045538 41.196307a38.990769 38.990769 0 0 0 30.326154-13.115077l0.472615 0.433231 148.046769-148.164923-148.48-144.226462-0.393846 0.393847zM415.783385 554.889846a38.872615 38.872615 0 0 0-28.672 12.760616l-0.196923-0.157539-133.750154 144.265846A289.201231 289.201231 0 0 1 53.956923 790.843077v0.472615c-0.866462-0.039385-1.575385-0.472615-2.441846-0.472615a39.384615 39.384615 0 1 0 0 78.769231c0.866462 0 1.575385-0.472615 2.441846-0.472616v0.472616c94.562462 0 184.516923-35.721846 255.094154-102.4l135.601231-146.156308-0.196923-0.157538a38.872615 38.872615 0 0 0 10.712615-26.624 39.384615 39.384615 0 0 0-39.384615-39.384616"
                  p-id="1288" fill="currentColor"></path>
              </svg>
              <!-- 单曲循环 -->
              <svg v-show="audioData.playMode == 'loop'" t="1669274080959" class="icon" viewBox="0 0 1024 1024"
                version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1441" width="28" height="28">
                <path
                  d="M773.597867 203.776l-0.273067 0.443733a33.621333 33.621333 0 0 0-20.343467-6.485333c-18.978133 0.785067-33.723733 16.725333-32.9728 35.771733a33.826133 33.826133 0 0 0 15.633067 26.794667l-0.1024 0.170667a375.227733 375.227733 0 0 1 166.2976 311.876266c0 207.018667-168.448 375.466667-375.466667 375.466667-27.818667 0-27.818667 0-54.340266-2.901333-90.453333-9.898667-152.610133-58.9824-155.5456-61.201067a375.330133 375.330133 0 0 1-165.5808-311.364267c0-201.4208 159.5392-365.841067 358.843733-374.647466l-41.984 40.823466 0.8192 0.853334a33.860267 33.860267 0 0 0-15.2576 29.218133c0.750933 18.978133 16.725333 33.757867 35.669333 33.041067a33.792 33.792 0 0 0 26.0096-14.472534l0.3072 0.341334 128.648534-124.996267L515.6864 34.0992l-0.4096 0.4096a33.6896 33.6896 0 0 0-26.3168-11.400533c-18.944 0.750933-33.6896 16.725333-32.9728 35.703466a33.8944 33.8944 0 0 0 13.038933 25.156267l45.226667 45.2608C275.182933 135.714133 82.602667 331.741867 82.602667 572.347733c0 147.626667 73.1136 285.149867 193.194666 366.114134 3.072 2.56 77.550933 62.190933 188.757334 74.308266 29.422933 3.208533 31.1296 3.310933 61.781333 3.310934 244.667733 0 443.733333-199.0656 443.733333-443.733334A443.392 443.392 0 0 0 773.597867 203.776"
                  p-id="1442" fill="currentColor"></path>
                <path
                  d="M542.071467 400.827733a33.28 33.28 0 0 0-17.134934 6.075734l-0.170666-0.3072-106.8032 69.700266 0.170666 0.273067a33.9968 33.9968 0 0 0-15.837866 29.696c0.750933 18.944 16.725333 33.723733 35.669333 32.9728a33.109333 33.109333 0 0 0 17.1008-6.0416l0.2048 0.273067 53.998933-35.259734v249.856h0.034134c0 0.477867-0.238933 0.887467-0.2048 1.365334a34.2016 34.2016 0 1 0 68.4032-1.365334h0.034133v-0.170666c0-0.4096 0.2048-0.750933 0.2048-1.160534 0-0.273067-0.170667-0.477867-0.2048-0.785066V435.2c0-0.477867 0.2048-0.887467 0.2048-1.3312a34.4064 34.4064 0 0 0-35.669333-33.041067"
                  p-id="1443" fill="currentColor"></path>
              </svg>
              <!-- 上一首 -->
              <svg @click="playPrevSong" t="1669272796937" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="7398" width="28" height="28">
                <path
                  d="M885.333333 938.713333a53.58 53.58 0 0 0 53.333334-53.433333V138.72a53.333333 53.333333 0 0 0-80.886667-45.666667L239.133333 466.333333a53.333333 53.333333 0 0 0 0 91.333334l618.666667 373.28a53.16 53.16 0 0 0 27.533333 7.766666z m-0.046666-810.666666a10.98 10.98 0 0 1 5.333333 1.42 10.466667 10.466667 0 0 1 5.42 9.286666v746.526667a10.666667 10.666667 0 0 1-16.18 9.133333l-618.666667-373.28a10.666667 10.666667 0 0 1 0-18.266666l618.666667-373.28a10.386667 10.386667 0 0 1 5.406667-1.586667zM85.333333 917.333333V106.666667a21.333333 21.333333 0 0 1 42.666667 0v810.666666a21.333333 21.333333 0 0 1-42.666667 0z"
                  fill="currentColor" p-id="7399"></path>
              </svg>
              <!-- 播放 -->
              <svg v-show="audioData.isPlay == true" @click="play(false)" t="1669272875401" class="icon"
                viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7772" width="50"
                height="50">
                <path
                  d="M512 42.666667C252.793333 42.666667 42.666667 252.793333 42.666667 512s210.126667 469.333333 469.333333 469.333333 469.333333-210.126667 469.333333-469.333333S771.206667 42.666667 512 42.666667z m0 896c-235.64 0-426.666667-191.026667-426.666667-426.666667s191.026667-426.666667 426.666667-426.666667 426.666667 191.026667 426.666667 426.666667-191.026667 426.666667-426.666667 426.666667z m106.666667-213.333334a21.333333 21.333333 0 0 1-21.333334-21.333333V320a21.333333 21.333333 0 0 1 42.666667 0v384a21.333333 21.333333 0 0 1-21.333333 21.333333z m-213.333334 0a21.333333 21.333333 0 0 1-21.333333-21.333333V320a21.333333 21.333333 0 0 1 42.666667 0v384a21.333333 21.333333 0 0 1-21.333334 21.333333z"
                  fill="currentColor" p-id="7773"></path>
              </svg>
              <!-- 暂停 -->
              <svg v-show="audioData.isPlay == false" @click="play(true)" t="1669273404666" class="icon"
                viewBox="0 0 1085 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5356" width="50"
                height="50">
                <path
                  d="M546.904228 18.10573c-277.76918 0-502.94529 225.17611-502.94529 502.94529 0 277.77164 225.17488 502.94775 502.94529 502.94775 277.76795 0 502.94529-225.17611 502.94529-502.94775C1049.849518 243.28307 824.672178 18.10573 546.904228 18.10573L546.904228 18.10573zM546.904228 973.701659c-249.992631 0-452.651868-202.659237-452.651868-452.651868 0-249.990172 202.659237-452.649408 452.651868-452.649408s452.650638 202.659237 452.650638 452.649408C999.554866 771.042422 796.896859 973.701659 546.904228 973.701659L546.904228 973.701659zM775.203924 485.406478c-78.267962-53.25591-220.1919-132.967608-301.004232-182.358388-33.132146-20.893592-60.993549-12.502952-63.667043 24.399633-1.938099 98.840588 0 289.550264 0 390.101445 1.681079 37.462125 34.709926 42.403293 63.37559 27.362121 80.72133-48.906255 219.456505-132.95777 300.588574-182.112436C773.968017 562.476656 836.097862 528.305364 775.203924 485.406478L775.203924 485.406478z"
                  p-id="5357" fill="currentColor"></path>
              </svg>
              <!-- 下一首 -->
              <svg @click="playNextSong" t="1669272830375" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="7554" width="28" height="28">
                <path
                  d="M138.666667 938.713333a53.58 53.58 0 0 1-53.333334-53.433333V138.72a53.333333 53.333333 0 0 1 80.886667-45.666667l618.666667 373.28a53.333333 53.333333 0 0 1 0 91.333334l-618.666667 373.28a53.16 53.16 0 0 1-27.553333 7.766666z m0.046666-810.666666a10.98 10.98 0 0 0-5.333333 1.42 10.466667 10.466667 0 0 0-5.38 9.253333v746.56a10.666667 10.666667 0 0 0 16.18 9.133333l618.666667-373.28a10.666667 10.666667 0 0 0 0-18.266666l-618.666667-373.28a10.386667 10.386667 0 0 0-5.446667-1.586667zM938.666667 917.333333V106.666667a21.333333 21.333333 0 0 0-42.666667 0v810.666666a21.333333 21.333333 0 0 0 42.666667 0z"
                  fill="currentColor" p-id="7555"></path>
              </svg>
              <!-- 播放列表 -->
              <PlayListIcon :size="28" color="#fff" />
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { throttle, debounce } from '@/utils/index.js';//节流函数
import { formatTime } from '@/utils/useFilter.js';// 时间格式化
import MVIcon from '@/components/MVIcon/index.vue';// mv图标
import PlayListIcon from "@/components/PlayListIcon/index.vue";// 引入播放列表图标组件
import MusicQualityIcon from "@/components/MusicQualityIcon/index.vue";// 引入音质图标组件
import disc from "@/assets/icons/ewj.png";// 唱片
import pointer from "@/assets/icons/fd6.png";// 指针
import { useAudioStore } from '@/stores/Audio.js';
import { ref, watch } from 'vue';
import { showNotify, showDialog } from 'vant';
import { useRouter } from 'vue-router';

const router = useRouter();
const { audioData, play, audio, playPrevSong, playNextSong, changeQuality } = useAudioStore();
const show = ref(false)// 是否显示播放弹窗
const showLyric = ref(false)// 是否显示歌词
const currentTime = ref(0)// 当前播放时间
const currentIndex = ref(0)// 当前激活的歌词索引
const isTouch = ref(false)// 是否正在拖动歌词
const showLyricType = ref(0)// 显示的歌词类型：0-原歌词，1-翻译歌词，2-罗马音歌词
const showTimeline = ref(false)// 是否显示时间线
const defaultFontSize = ref(12)// 默认歌词字体大小
const defaultLyricTime = ref(0)// 默认歌词时间
const showMoreSetting = ref(false)// 是否显示更多设置
const WaypointPercent = ref('0%')// 试听歌词时长锚点百分比
const WaypointDisplay = ref('none')// 是否显示锚点

// 监听播放时间更新的事件
audio.ontimeupdate = () => {
  // 更新当前播放时间
  currentTime.value = Number(audio.currentTime + defaultLyricTime.value)
  // 更新当前激活的歌词索引
  for (let i = 0; i < audioData.lyric.length; i++) {
    if (currentTime.value >= audioData.lyric[i].time) {
      currentIndex.value = i
    }
  }
}

// 播放激活歌词索引改变时，滚动歌词列表
watch(
  currentIndex,
  (newIndex) => {
    // 判断是否在歌词页，防止dom还未渲染完毕
    if (show.value && showLyric.value) {
      // 判断是否正在拖动歌词
      if (isTouch.value == false) {
        // scrollLyric()
        test()
      }
    }
  },
  { immediate: true }
)

// 监听是否是试听歌曲的变化
watch(
  () => audioData.isTrial,
  (value) => {
    if (value == true) {
      WaypointPercent.value = audio.duration / (audioData.song.dt / 1000) * 100 + '% '// 计算试听时长占总时长的百分比
      WaypointDisplay.value = 'block'// 显示锚点
      // console.log("试听时长占总时长的百分比", WaypointPercent.value)
    } else {
      WaypointDisplay.value = 'none'// 隐藏锚点
    }
  },
)

// 切换歌词显示类型
const switchLyricType = () => {
  showLyricType.value++
  // 判断一共有几种歌词类型
  if (audioData.haveTlyric && audioData.haveRomalrc) {
    if (showLyricType.value > 2) {
      showLyricType.value = 0
    }
  } else if (audioData.haveTlyric) {
    if (showLyricType.value > 1) {
      showLyricType.value = 0
    }
  } else {
    showLyricType.value = 0
  }
  // console.log(showLyricType.value)
}

// touchstart:手指触摸屏幕时触发
const touchstartHandle = () => {
  isTouch.value = true
  showTimeline.value = true
}

// touchend：触摸结束（手指从触摸屏上移开）,3s内没有再次触发该事件就回到当前激活歌词（防抖函数）
const touchendHandle = debounce(() => {
  isTouch.value = false
  showTimeline.value = false
  scrollLyric()
}, 3000)//可手动设置延时时间

// 滑块改变时触发(value是当前滑块的值)
const onChange = (value) => {
  audio.currentTime = value
}

// 滚动到激活歌词
const scrollLyric = () => {
  console.log("滚动到激活歌词")
  // 获取激活的歌词
  const activeLyric = document.querySelector(".activeLyric")
  // 让歌词滚动到可视区域
  activeLyric && activeLyric.scrollIntoView({ behavior: "smooth", block: "center" })
}

// 测试操作dom滚动歌词
const test = () => {
  // 1.通过document.querySelectorAll(".lyric__item")获取所有歌词的元素，根据每个元素的clientHeight获取元素的高度；
  // 2.根据当前播放歌词的索引，获取当前歌词元素到顶部的距离，并设置滚动到顶部的距离；
  // 3.同时根据当前歌词的索引，就可以设置歌词的高亮样式；
  // 4.同时，根据元素的高度还可以设置当前歌词居中；

  // 通过document.querySelectorAll(".lyric__item")获取所有歌词的元素，根据每个元素的clientHeight获取元素的高度
  const lyricItems = document.querySelectorAll(".lyric__item")
  // 获取所有歌词的高度
  const lyricItemsHeight = Array.from(lyricItems).map((item) => item.clientHeight)
  // console.log(lyricItemsHeight)

  // 获取歌词容器的高度
  const lyricContentHeight = document.querySelector(".lyric").clientHeight

  // 根据当前播放歌词的索引，获取当前歌词元素到顶部的距离，并设置滚动到顶部的距离
  const lyricScrollTop = lyricItemsHeight.slice(0, currentIndex.value).reduce((prev, next) => prev + next, 0)
  // console.log(lyricScrollTop)

  // 设置滚动到顶部的距离，让它居中显示  - (lyricContentHeight - lyricItemsHeight[currentIndex.value]) / 2
  const lyricList = document.querySelector(".lyric")
  lyricList.scrollTop = lyricScrollTop + lyricItemsHeight[currentIndex.value] / 2
}

// 切换播放音质
const switchQuality = (e) => {
  changeQuality(e)
}

// 跳转到歌手详情
function routerPush(path, query) {
  show.value = false// 隐藏播放器
  router.push({ path, query })
}
</script>

<style scoped lang="less">
:deep(.van-slider::after) {
  content: '';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: v-bind(WaypointPercent);
  height: 6px;
  width: 6px;
  border-radius: 50%;
  background-color: #fff;
  display: v-bind(WaypointDisplay);
}

// 唱片和歌词切换的淡入淡出过渡
.v-enter-active,
.v-leave-active {
  transition: opacity .3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

// 歌词更多设置弹窗
.lyricMoreSetting {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  &__title {
    padding: 16px;
    font-size: 14px;
  }

  &__line {
    height: 1px;
    background-color: #e5e5e5;
  }

  &__item {
    padding: 16px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    line-height: 1;
    overflow: hidden;

    &__left {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }
}

// 激活歌词的样式
.activeLyric {
  color: #ffffff;
  font-size: 16px;
  scroll-behavior: smooth;
}

.background {
  color: #fff;
  // 背景图
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  // 过渡
  transition: all 0.5s;
}

// 歌词弹窗
.popup {
  height: 100vh;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
  // 背景滤镜
  backdrop-filter: saturate(150%) contrast(100%) blur(40px) brightness(60%);

  .popup__top {
    height: 46px;
    display: flex;
    align-items: center;
    gap: 16px;

    .popup__top__center {
      flex: 1;
      display: flex;
      flex-direction: column;
      // align-items: center;
      gap: 4px;
      overflow: hidden;
      line-height: 1;

      .title {
        font-size: 16px;
        // margin: 0 auto; // 水平居中
        text-align: center;
        // TODO：文本无缝滚动动画,当左边消失50%的时候，左边消失的内容从右边出现
        // animation: scroll 20s linear infinite;
        // 只执行1次
        // animation: scroll 20s linear 1;

        @keyframes scroll {
          0% {
            transform: translateX(100vw);
          }

          100% {
            transform: translateX(-100vw);
          }
        }
      }


      .artist {
        font-size: 14px;
        color: #ffffff88;
        // margin: 0 auto; // 水平居中
        text-align: center;

        .artist__item {

          span:hover {
            color: #fff;
            cursor: pointer;
          }

          span:not(:last-child)::after {
            content: '/';
            margin: 0 6px;
            color: #ffffff88;
          }
        }

        i {
          margin-left: 8px;
        }
      }

      span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .popup__center {
    flex: 1;
    overflow: hidden;
    position: relative;
    // 禁止
    user-select: none;
    -webkit-user-drag: none;
    // backdrop-filter: blur(2px);// 模糊
    // backdrop-filter: brightness(60%);// 亮度
    // backdrop-filter: contrast(40%);// 对比度
    // backdrop-filter: drop-shadow(4px 4px 10px blue);// 阴影
    // backdrop-filter: grayscale(30%);// 灰度
    // backdrop-filter: hue-rotate(120deg);// 色相旋转
    // backdrop-filter: invert(70%);// 反转
    // backdrop-filter: opacity(20%);// 透明度
    // backdrop-filter: sepia(90%);// 褐色
    // backdrop-filter: saturate(80%);// 饱和度

    // 唱片页
    .popup__center__disc {
      position: relative;
      height: 100%;

      // 指针
      .pointer {
        position: absolute;
        top: 0;
        left: 50%;
        width: 100px;
        // height: 100%;
        aspect-ratio: 4 / 7;
        // transform: translateX(-10px) rotate(0deg); //停止播放时的指针角度为：-20deg
        transform-origin: 15px 15px; // 旋转中心点(x,y,z)
        transition: transform 0.3s;
        z-index: 2;
      }

      // 唱片
      .disc {
        width: 250px;
        height: 250px;
        border-radius: 50%;
        box-shadow: 0 0 5px 0px rgb(255 255 255 / 25%); // 阴影
        position: absolute;
        top: 110px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1;
      }

      // 封面
      .cover {
        border-radius: 50%;
        width: 170px;
        height: 170px;
        position: absolute;
        top: 150px;
        z-index: 0;
        // left: 50%;
        // transform: translateX(-50%);// transform和animation不能同时使用
        // 左右居中
        margin: 0 auto;
        left: 0;
        right: 0;
        // 
        animation: discRotate 25s linear infinite;
        // animation-play-state: paused; // 暂停动画
        // animation-play-state: running; // 恢复动画
      }

    }

    // 歌词页
    .popup__center__lyric {
      height: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 20px;
      font-size: 16px;
      color: #ffffff88;
      scroll-behavior: smooth;
      transition: all 0.3s;
      position: relative;

      // 歌词
      .lyric {
        scroll-behavior: smooth;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        // gap: 20px;
        font-size: 16px;
        color: #ffffff88;
        scroll-behavior: smooth;
        transition: all 0.3s;
        overflow-y: auto;
        // 淡入淡出遮罩效果
        -webkit-mask-image: linear-gradient(180deg,
            hsla(0, 0%, 100%, 0) 0,
            hsla(0, 0%, 100%, .6) 7%,
            #fff 15%, #fff 85%,
            hsla(0, 0%, 100%, .6) 93%,
            hsla(0, 0%, 100%, 0));
        mask-image: linear-gradient(180deg,
            hsla(0, 0%, 100%, 0) 0,
            hsla(0, 0%, 100%, .6) 7%,
            #fff 15%, #fff 85%,
            hsla(0, 0%, 100%, .6) 93%,
            hsla(0, 0%, 100%, 0));

        .lyric__item {
          padding: 16px 0;
          scroll-behavior: smooth;
          line-height: 1.5;
          font-size: 15px;
          text-align: center; // 文本居中
          white-space: normal; // 换行
          word-break: break-word; // 换行
          display: flex;
          flex-direction: column;

          &:nth-child(1) {
            // 腾出半个空屏， 16px * 4是padding和gap，46px是头部的padding，80px是播放控件的高度
            margin-top: calc((100vh - (16px * 4) - 46px - 80px) / 2);
          }

          &:last-child {
            margin-bottom: calc((100vh - (16px * 4) - 46px - 80px) / 2);
          }
        }

        // 滚动条样式
        &::-webkit-scrollbar {
          width: 0; // 隐藏滚动条
          height: 0; // 隐藏滚动条
        }

        &::-webkit-scrollbar-thumb {
          background: #fff;
          border-radius: 4px;
        }

        &::-webkit-scrollbar-track {
          background: #fff;
          border-radius: 4px;
        }
      }

      // MV,歌词翻译切换，更多设置
      .bottom__setting {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        line-height: 1;
        z-index: 1;

        .bottom__setting__right {
          display: flex;
          align-items: center;
          gap: 16px;

          .translateLyric {
            border: 1px solid currentColor;
            border-radius: 20px;
            padding: 3px 6px;
            font-size: 12px;
            cursor: pointer;

            span:not(:last-child)::after {
              content: '/';
              margin: 0 4px;
              color: #ffffff88;
            }
          }
        }

        .bottom__setting__left {
          display: flex;
          align-items: center;
          gap: 16px;
        }
      }

      .top__setting {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        line-height: 1;
        z-index: 1;

        .top__setting__right {
          display: flex;
          align-items: center;
          gap: 16px;
        }
      }

      // 时间线
      .timeline {
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        bottom: 50%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: nowrap;
        gap: 10px;
        font-size: 12px;

        .timeline__line {
          width: 100%;
          height: 1px;
          background: #ffffff44;
        }
      }

    }
  }

  .popup__bottom {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .progress {
      display: flex;
      align-items: center;
      gap: 16px;
      font-size: 12px;
      user-select: none;

      .progress__time {
        width: 50px;
        text-align: center;
      }

      // 进度条按钮样式
      .custom-button {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: rgb(255, 255, 255);
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        transition: all .3s;

        &:hover {
          width: 20px;
          height: 20px;
        }
      }
    }

    .controller {
      display: flex;
      align-items: center;
      justify-content: space-around;
      color: #fff;
      line-height: 1;
    }
  }
}

// 定义唱片旋转动画
@keyframes discRotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.Audio {
  height: 44px;
  width: 100%;
  background: var(--van-nav-bar-background);
  padding: 0 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  overflow: hidden;

  .left {
    width: 40px;
    height: 40px;
    position: relative;
    margin-right: 10px;

    img {
      width: 100%;
      height: 100%;
    }

    .play {
      height: 100%;
      width: 100%;
      animation: discRotate 25s linear infinite;
      // 暂停唱片动画
      animation-play-state: paused;
    }

    // 唱片
    .discImg {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }

    // 封面
    .songImg {
      height: 70%;
      width: 70%;
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 2;
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .center {
    flex: 1;
    color: var(--font-color-dark);
    font-size: 14px;
  }

  .right {
    width: auto;
    height: 100%;
    margin-left: 20px;
    display: flex;
    align-items: center;
    gap: 20px;

    .playIcon {
      width: 20px;
      height: 20px;
      cursor: pointer;
      // 改变图片颜色
      background-color: var(--font-color-5);
      mask-image: url("@/assets/icons/icon-play-square.png"); // 播放按钮
      mask-size: 100%;
      // 兼容谷歌浏览器
      -webkit-mask-image: url("@/assets/icons/icon-play-square.png");
      -webkit-mask-size: 100%;
    }

    .listIcon {
      width: 20px;
      height: 20px;
      cursor: pointer;
      // 改变图片颜色
      background-color: var(--font-color-5);
      mask-image: url("@/assets/icons/eys.png"); // 播放列表
      mask-size: 100%;
      // 兼容谷歌浏览器
      -webkit-mask-image: url("@/assets/icons/eys.png");
      -webkit-mask-size: 100%;
    }
  }
}
</style>