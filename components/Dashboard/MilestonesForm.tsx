import React from 'react'

function MilestonesForm() {
    
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          coinSymbol: {
            id: "",
            symbol: "",
            name: "",
            image: "",
            current_price: 0,
          },
          accountType: AccountType.PERSONAL,
          tradeSession: TradeSession.NEW_YORK,
          timeframe: TradeTimeframe.M3,
          tradeType: TradeType.BUY,
          entryPrice: selectedCoin ? selectedCoin.current_price : 0,
          takeProfit: 0,
          stopLoss: 0,
          riskAmount: 0,
          leverage: 0,
          positionSize: 0,
          realizedPnL: 0,
          risk_Reward: 0,
          date: new Date(),
          tradeStatus: TradeStatus.WIN,
          strategy: {
            divergence: false,
            head_and_Shoulders: false,
            trendline_Retest: false,
            fib_Key_Levels: false,
            pro_Trend_Bias: false,
            indicator_Highlight: false,
          },
          tradeReview: "",
          tradeScreenshot: "",
    
          confidence: [0],
        },
      });
    
      const {
        control,
        handleSubmit,
        watch,
        reset,
        getValues,
        setValue,
        formState: { errors },
      } = form;
      console.log(errors);
  return (
    <Form>

    </Form>
  )
}

export default MilestonesForm
