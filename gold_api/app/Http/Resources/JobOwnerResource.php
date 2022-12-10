<?php

namespace App\Http\Resources;

use App\Models\InventoryDayBook;
use App\Models\RawMaterial;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property mixed job_id
 * @property mixed order_id
 * @property mixed product_code
 * @property mixed pieces
 * @property mixed productSize
 * @property mixed expected_gold
 * @property mixed p_loss
 * @property mixed tr_time
 * @property mixed employee
 * @property mixed statuses
 * @property mixed price_code
 * @property mixed price
 * @property mixed gold_send
 * @property mixed dal_send
 * @property mixed pan_send
 * @property mixed bronze_send
 * @property mixed copper_send
 * @property mixed goldReturned
 * @property mixed gold_returned
 * @property mixed dal_returned
 * @property mixed pan_returned
 * @property mixed bronze_returned
 * @property mixed nitrick_returned
 * @property mixed copper_return
 * @property mixed product_wt
 * @property mixed comments
 * @property mixed dal
 * @property mixed pan
 * @property mixed bronze
 * @property mixed copper
 * @property mixed markup_value
 * @property mixed orderDetails
 * @property mixed gold
 * @property mixed rm_id
 */
class JobOwnerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {

        $nitricReturnedActual = InventoryDayBook::whereReferenceAndRmId($this->job_id,45)->first();
        $pan = new RawMaterialResource($this->pan);
        return [
            'jobId' => $this->job_id,
            'jobDate'=> (new Carbon($this->tr_time))->format('Y-m-d'),
            'orderId' => $this->order_id,
            'productCode' => $this->product_code,
            'rmId' => $this->rm_id,
            'pieces' => $this->pieces,
            'productSize' => $this->productSize,
            'expectedGold' => $this->expected_gold,
            'pLoss' => $this->p_loss,
            'trTime' => $this->tr_time->format('Y-m-d'),
            'formattedTrTime' => $this->tr_time->format('d-m-Y'),
            'currentStatus' =>new TableStatusResource($this->statuses),
            'employee' =>new EmployeeResource($this->employee),
            'priceCode' =>$this->price_code,
            'price' =>$this->price,
            'goldSend' =>$this->gold_send,
            'billedPan' => $this->pan_send,
            'dalSend' =>$this->dal_send,
            'panSend' =>$this->pan_send,
            'bronzeSend' =>$this->bronze_send,
            'goldReturned' =>$this->gold_returned,
            'dalReturned' =>$this->dal_returned,
            'panReturned' =>$this->pan_returned,
            'bronzeReturned' =>$this->bronze_returned,
            'nitrickReturned' =>$this->nitrick_returned,
            'nitricReturnedActual' => $nitricReturnedActual?$nitricReturnedActual->rm_value:0,
            'copperReturned' =>$this->copper_return,
            'productWeight' =>$this->product_wt,
            'comment' =>$this->comments,
            'gold'=>new RawMaterialResource($this->gold),
            'dal'=>new RawMaterialResource($this->dal),
            'pan'=>$pan,
            'bronze'=>new RawMaterialResource($this->bronze),
            'markupValue'=>$this->markup_value,
            'orderDetails'=>new OrderDetailResource($this->orderDetails)

        ];
    }
}
