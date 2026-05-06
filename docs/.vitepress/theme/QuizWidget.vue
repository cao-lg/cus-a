<template>
  <div class="quiz-widget">
    <div v-if="loading" class="quiz-loading">加载题目中...</div>
    <div v-else-if="error" class="quiz-error">{{ error }}</div>
    <div v-else>
      <!-- 进度条 -->
      <div class="quiz-progress">
        <div class="quiz-progress-bar" :style="{ width: progressPercent + '%' }"></div>
        <span class="quiz-progress-text">{{ currentIndex + 1 }} / {{ questions.length }}</span>
      </div>

      <!-- 题目区域 -->
      <div v-if="!submitted" class="quiz-question-card">
        <div class="quiz-type-badge">{{ currentQuestion.type === 'single' ? '单选题' : '判断题' }}</div>
        <h4 class="quiz-question-text">{{ currentQuestion.question }}</h4>

        <!-- 单选题选项 -->
        <div v-if="currentQuestion.type === 'single'" class="quiz-options">
          <label
            v-for="(opt, i) in currentQuestion.options"
            :key="i"
            class="quiz-option"
            :class="{ selected: userAnswers[currentIndex] === i }"
          >
            <input type="radio" :name="'q' + currentIndex" :value="i" v-model="userAnswers[currentIndex]" />
            <span class="quiz-option-text">{{ opt }}</span>
          </label>
        </div>

        <!-- 判断题选项 -->
        <div v-else class="quiz-options quiz-tf">
          <label class="quiz-option" :class="{ selected: userAnswers[currentIndex] === true }">
            <input type="radio" :name="'q' + currentIndex" :value="true" v-model="userAnswers[currentIndex]" />
            <span class="quiz-option-text">✅ 正确</span>
          </label>
          <label class="quiz-option" :class="{ selected: userAnswers[currentIndex] === false }">
            <input type="radio" :name="'q' + currentIndex" :value="false" v-model="userAnswers[currentIndex]" />
            <span class="quiz-option-text">❌ 错误</span>
          </label>
        </div>

        <!-- 导航按钮 -->
        <div class="quiz-nav">
          <button v-if="currentIndex > 0" @click="prev" class="quiz-btn quiz-btn-secondary">上一题</button>
          <span v-else></span>
          <button v-if="currentIndex < questions.length - 1" @click="next" class="quiz-btn quiz-btn-primary" :disabled="userAnswers[currentIndex] === undefined">
            下一题
          </button>
          <button v-else @click="submit" class="quiz-btn quiz-btn-submit" :disabled="userAnswers[currentIndex] === undefined">
            提交答卷
          </button>
        </div>
      </div>

      <!-- 结果区域 -->
      <div v-else class="quiz-result">
        <div class="quiz-score-card" :class="scoreClass">
          <div class="quiz-score-number">{{ correctCount }} / {{ questions.length }}</div>
          <div class="quiz-score-label">{{ scoreLabel }}</div>
          <div class="quiz-score-percent">{{ scorePercent }}%</div>
        </div>

        <!-- 逐题解析 -->
        <div class="quiz-review">
          <h4>📝 答题解析</h4>
          <div v-for="(q, i) in questions" :key="i" class="quiz-review-item" :class="{ correct: isCorrect(i), wrong: !isCorrect(i) }">
            <div class="quiz-review-header">
              <span class="quiz-review-num">第{{ i + 1 }}题</span>
              <span class="quiz-review-badge">{{ q.type === 'single' ? '单选' : '判断' }}</span>
              <span class="quiz-review-status">{{ isCorrect(i) ? '✅ 正确' : '❌ 错误' }}</span>
            </div>
            <p class="quiz-review-question">{{ q.question }}</p>
            <p v-if="q.type === 'single'" class="quiz-review-answer">
              正确答案：<strong>{{ q.options[q.answer] }}</strong>
              <span v-if="!isCorrect(i)"> | 你的答案：<strong class="wrong-text">{{ q.options[userAnswers[i]] }}</strong></span>
            </p>
            <p v-else class="quiz-review-answer">
              正确答案：<strong>{{ q.answer ? '正确' : '错误' }}</strong>
              <span v-if="!isCorrect(i)"> | 你的答案：<strong class="wrong-text">{{ userAnswers[i] ? '正确' : '错误' }}</strong></span>
            </p>
            <div class="quiz-review-explanation">
              💡 {{ q.explanation }}
            </div>
          </div>
        </div>

        <button @click="retry" class="quiz-btn quiz-btn-submit" style="margin-top:20px;">重新答题</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  week: { type: String, required: true }
})

const questions = ref([])
const currentIndex = ref(0)
const userAnswers = ref({})
const submitted = ref(false)
const loading = ref(true)
const error = ref('')

const currentQuestion = computed(() => questions.value[currentIndex.value] || {})
const progressPercent = computed(() => ((currentIndex.value + 1) / questions.value.length) * 100)
const correctCount = computed(() => questions.value.filter((q, i) => isCorrect(i)).length)
const scorePercent = computed(() => Math.round((correctCount.value / questions.value.length) * 100))

const scoreClass = computed(() => {
  if (scorePercent.value >= 80) return 'score-excellent'
  if (scorePercent.value >= 60) return 'score-good'
  return 'score-need-improve'
})

const scoreLabel = computed(() => {
  if (scorePercent.value >= 80) return '🎉 优秀！掌握扎实'
  if (scorePercent.value >= 60) return '👍 良好！继续加油'
  return '📖 需要复习，再看看讲义吧'
})

function isCorrect(i) {
  const q = questions.value[i]
  if (!q) return false
  return userAnswers.value[i] === q.answer
}

function prev() { currentIndex.value-- }
function next() { currentIndex.value++ }

function submit() { submitted.value = true }

function retry() {
  currentIndex.value = 0
  userAnswers.value = {}
  submitted.value = false
}

onMounted(async () => {
  try {
    const weekNum = String(props.week).padStart(2, '0')
    const resp = await fetch(`/quizzes/week${weekNum}.json`)
    if (!resp.ok) throw new Error('题目加载失败')
    const data = await resp.json()
    questions.value = data.questions || []
  } catch (e) {
    error.value = '加载题目失败，请刷新页面重试'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.quiz-widget {
  margin: 24px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
.quiz-loading, .quiz-error {
  padding: 40px;
  text-align: center;
  color: var(--vp-c-text-2);
}
.quiz-progress {
  position: relative;
  height: 6px;
  background: var(--vp-c-bg-soft);
}
.quiz-progress-bar {
  height: 100%;
  background: var(--vp-c-brand-1);
  transition: width 0.3s;
  border-radius: 0 3px 3px 0;
}
.quiz-progress-text {
  position: absolute;
  right: 12px;
  top: -22px;
  font-size: 12px;
  color: var(--vp-c-text-3);
}
.quiz-question-card {
  padding: 24px;
}
.quiz-type-badge {
  display: inline-block;
  padding: 2px 10px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 12px;
}
.quiz-question-text {
  font-size: 16px;
  line-height: 1.7;
  margin: 0 0 16px;
  color: var(--vp-c-text-1);
}
.quiz-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}
.quiz-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}
.quiz-option:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
}
.quiz-option.selected {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}
.quiz-option input[type="radio"] {
  accent-color: var(--vp-c-brand-1);
  width: 16px;
  height: 16px;
}
.quiz-option-text {
  font-size: 14px;
  line-height: 1.5;
}
.quiz-tf {
  flex-direction: row;
  gap: 12px;
}
.quiz-tf .quiz-option {
  flex: 1;
  justify-content: center;
}
.quiz-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.quiz-btn {
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}
.quiz-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.quiz-btn-primary {
  background: var(--vp-c-brand-1);
  color: #fff;
}
.quiz-btn-primary:hover:not(:disabled) {
  background: var(--vp-c-brand-2);
}
.quiz-btn-secondary {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}
.quiz-btn-submit {
  background: #1a7f37;
  color: #fff;
}
.quiz-btn-submit:hover:not(:disabled) {
  background: #1a8f3f;
}
/* 结果 */
.quiz-result {
  padding: 24px;
}
.quiz-score-card {
  text-align: center;
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 24px;
}
.quiz-score-card.score-excellent {
  background: linear-gradient(135deg, #d4edda, #c3e6cb);
  border: 1px solid #28a745;
}
.quiz-score-card.score-good {
  background: linear-gradient(135deg, #fff3cd, #ffeaa7);
  border: 1px solid #ffc107;
}
.quiz-score-card.score-need-improve {
  background: linear-gradient(135deg, #f8d7da, #f5c6cb);
  border: 1px solid #dc3545;
}
.quiz-score-number {
  font-size: 36px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.quiz-score-label {
  font-size: 16px;
  margin: 8px 0;
}
.quiz-score-percent {
  font-size: 14px;
  color: var(--vp-c-text-2);
}
.quiz-review h4 {
  margin: 0 0 16px;
}
.quiz-review-item {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
}
.quiz-review-item.correct {
  border-left: 4px solid #28a745;
}
.quiz-review-item.wrong {
  border-left: 4px solid #dc3545;
}
.quiz-review-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}
.quiz-review-num {
  font-weight: 600;
  font-size: 14px;
}
.quiz-review-badge {
  font-size: 11px;
  padding: 1px 8px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  color: var(--vp-c-text-3);
}
.quiz-review-status {
  font-size: 13px;
  margin-left: auto;
}
.quiz-review-question {
  font-size: 14px;
  margin: 0 0 8px;
  line-height: 1.6;
}
.quiz-review-answer {
  font-size: 13px;
  margin: 0 0 8px;
  color: var(--vp-c-text-2);
}
.wrong-text {
  color: #dc3545;
}
.quiz-review-explanation {
  font-size: 13px;
  padding: 10px 12px;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}
</style>
