export const calculatePercentence = ({
  HOURS,
  startHour,
  startMinute,
  endHour,
  endMinute,
}) => {
  /*
   * Başlangıç-bitiş saat ve dakikalarının x eksenindeki yüzdesini hesaplar
   */

  // 2 aralık arasındaki uzaklığın yüzdesi
  const distanceBetweenTwoStepsPercentence = (1 / (HOURS - 1)) * 100

  // Başlangıç-bitiş saatlerinin yüzdesi
  const startHourPercentence = (startHour / (HOURS - 1)) * 100
  const endHourPercentenge = (endHour / (HOURS - 1)) * 100

  // Başlangıç-bitiş dakikalarının 1 aralıktaki yüzdesi
  const startMinutePercentence =
    (startMinute / 60) * 100 * (distanceBetweenTwoStepsPercentence / 100)
  const endMinutePercentence =
    (endMinute / 60) * 100 * (distanceBetweenTwoStepsPercentence / 100)

  return {
    startHourPercentence,
    endHourPercentenge,
    startMinutePercentence,
    endMinutePercentence,
  }
}
