<template>
  <ClientOnly>
    <div class="quiz-widget">
      <div v-if="loading" class="quiz-loading">加载题目中...</div>
      <div v-else-if="error" class="quiz-error">{{ error }}</div>
      <div v-else-if="questions.length === 0" class="quiz-error">暂无题目</div>
      <div v-else>
        <div class="quiz-progress">
          <div class="quiz-progress-bar" :style="{ width: progressPercent + '%' }"></div>
          <span class="quiz-progress-text">{{ currentIndex + 1 }} / {{ questions.length }}</span>
        </div>
        <div v-if="!submitted" class="quiz-question-card">
          <div class="quiz-type-badge">{{ currentQuestion.type === 'single' ? '单选题' : '判断题' }}</div>
          <h4>{{ currentQuestion.question }}</h4>
          <div v-if="currentQuestion.type === 'single'" class="quiz-options">
            <label v-for="(opt, i) in currentQuestion.options" :key="i" :class="userAnswers[currentIndex] === i ? 'selected' : ''">
              <input type="radio" :value="i" v-model="userAnswers[currentIndex]" /> {{ opt }}
            </label>
          </div>
          <div v-else class="quiz-options">
            <label :class="userAnswers[currentIndex] === true ? 'selected' : ''">
              <input type="radio" :value="true" v-model="userAnswers[currentIndex]" /> ✅ 正确
            </label>
            <label :class="userAnswers[currentIndex] === false ? 'selected' : ''">
              <input type="radio" :value="false" v-model="userAnswers[currentIndex]" /> ❌ 错误
            </label>
          </div>
          <div class="quiz-nav">
            <button v-if="currentIndex > 0" @click="prev" class="quiz-btn-secondary">上一题</button>
            <button v-if="currentIndex < questions.length - 1" @click="next" :disabled="userAnswers[currentIndex] === undefined" class="quiz-btn-primary">下一题</button>
            <button v-else @click="submit" :disabled="userAnswers[currentIndex] === undefined" class="quiz-btn-submit">提交答卷</button>
          </div>
        </div>
        <div v-else>
          <div :class="['quiz-score', scoreClass]">
            <h2>{{ correctCount }} / {{ questions.length }}</h2>
            <p>{{ scoreLabel }}</p>
            <p>{{ scorePercent }}%</p>
          </div>
          <div v-for="(q, i) in questions" :key="i" :class="['quiz-review', isCorrect(i) ? 'correct' : 'wrong']">
            <p>第{{ i+1 }}题 {{ isCorrect(i) ? '✅' : '❌' }}</p>
            <p>{{ q.question }}</p>
            <p>答案：{{ q.type === 'single' ? q.options[q.answer] : (q.answer ? '正确' : '错误') }}</p>
            <p>💡 {{ q.explanation }}</p>
          </div>
          <button @click="retry" class="quiz-btn-submit">重新答题</button>
        </div>
      </div>
    </div>
    <template #fallback>
      <div class="quiz-widget">
        <div class="quiz-loading">加载中...</div>
      </div>
    </template>
  </ClientOnly>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({ week: String })
const questions = ref([])
const currentIndex = ref(0)
const userAnswers = ref({})
const submitted = ref(false)
const loading = ref(true)
const error = ref('')

const currentQuestion = computed(() => questions.value[currentIndex.value] || {})
const progressPercent = computed(() => ((currentIndex.value + 1) / questions.value.length) * 100)
const correctCount = computed(() => questions.value.filter((q, i) => userAnswers.value[i] === q.answer).length)
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
  return userAnswers.value[i] === q?.answer
}

function prev() { currentIndex.value-- }
function next() { currentIndex.value++ }
function submit() { submitted.value = true }
function retry() {
  currentIndex.value = 0
  userAnswers.value = {}
  submitted.value = false
}

onMounted(() => {
  loadQuiz()
})

async function loadQuiz() {
  try {
    const weekNum = String(props.week).padStart(2, '0')
    console.log('[Quiz] Loading quiz for week:', weekNum)
    
    const resp = await fetch(`/quizzes/week${weekNum}.json`)
    console.log('[Quiz] Response status:', resp.status)
    
    if (!resp.ok) {
      throw new Error(`HTTP ${resp.status}: ${resp.statusText}`)
    }
    
    const text = await resp.text()
    console.log('[Quiz] Response text length:', text.length)
    
    if (!text || text.trim() === '') {
      throw new Error('Empty response')
    }
    
    let data
    try {
      data = JSON.parse(text)
    } catch (parseErr) {
      console.error('[Quiz] JSON parse error:', parseErr.message)
      console.error('[Quiz] Response text preview:', text.substring(0, 200))
      throw new Error(`JSON parse error: ${parseErr.message}`)
    }
    
    console.log('[Quiz] Loaded questions:', data.questions?.length)
    
    if (!data.questions || !Array.isArray(data.questions)) {
      throw new Error('Invalid data format: questions array not found')
    }
    
    questions.value = data.questions
  } catch (e) {
    console.error('[Quiz] Failed to load quiz:', e.message || e)
    error.value = `加载题目失败: ${e.message}`
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.quiz-widget { border: 1px solid var(--vp-c-divider); border-radius: 12px; overflow: hidden; margin: 24px 0; padding: 20px; }
.quiz-loading, .quiz-error { padding: 40px; text-align: center; color: var(--vp-c-text-2); }
.quiz-error { color: #dc3545; }
.quiz-progress { position: relative; height: 6px; background: var(--vp-c-bg-soft); margin-bottom: 20px; }
.quiz-progress-bar { height: 100%; background: var(--vp-c-brand-1); transition: width 0.3s; }
.quiz-progress-text { position: absolute; right: 12px; top: -20px; font-size: 12px; color: var(--vp-c-text-3); }
.quiz-type-badge { display: inline-block; padding: 2px 10px; background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1); border-radius: 10px; font-size: 12px; font-weight: 600; margin-bottom: 12px; }
.quiz-options label { display: block; padding: 12px 16px; margin: 6px 0; border: 1px solid var(--vp-c-divider); border-radius: 8px; cursor: pointer; }
.quiz-options label:hover { border-color: var(--vp-c-brand-1); background: var(--vp-c-bg-soft); }
.quiz-options label.selected { border-color: var(--vp-c-brand-1); background: var(--vp-c-brand-soft); }
.quiz-options input { accent-color: var(--vp-c-brand-1); margin-right: 8px; }
.quiz-nav { display: flex; justify-content: space-between; margin-top: 16px; }
.quiz-nav button { padding: 10px 24px; border: none; border-radius: 8px; font-size: 14px; cursor: pointer; }
.quiz-btn-primary { background: var(--vp-c-brand-1); color: #fff; }
.quiz-btn-secondary { background: var(--vp-c-bg-soft); color: var(--vp-c-text-1); border: 1px solid var(--vp-c-divider); }
.quiz-btn-submit { background: #1a7f37; color: #fff; }
.quiz-nav button:disabled { opacity: 0.4; cursor: not-allowed; }
.quiz-score { text-align: center; padding: 24px; border-radius: 12px; margin: 16px 0; }
.score-excellent { background: #d4edda; border: 1px solid #28a745; }
.score-good { background: #fff3cd; border: 1px solid #ffc107; }
.score-need-improve { background: #f8d7da; border: 1px solid #dc3545; }
.quiz-review { padding: 16px; margin: 10px 0; border-radius: 8px; border: 1px solid var(--vp-c-divider); }
.quiz-review.correct { border-left: 4px solid #28a745; }
.quiz-review.wrong { border-left: 4px solid #dc3545; }
.quiz-review p { margin: 4px 0; font-size: 14px; line-height: 1.6; }
</style>
