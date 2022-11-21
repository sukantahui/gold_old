<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property mixed city
 * @property mixed cust_address
 * @property mixed mailing_name
 * @property mixed cust_name
 * @property mixed cust_id
 * @property mixed cust_pin
 * @property mixed cust_phone
 * @property mixed p_cat
 * @property mixed gold_limit
 * @property mixed cash_limit
 * @property mixed short_name
 * @property mixed markup_value
 * @property mixed order_inforced
 * @property mixed order_inforce
 * @property mixed bill_inforce
 * @property mixed lc_discount_percentage
 */
class CustomerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return array(
            'customerId'=>$this->cust_id,
            'customerName'=>$this->cust_name,
            'mailingName'=>$this->mailing_name,
            'city'=>$this->city,
            'address'=>$this->cust_address,
            'pin'=>$this->cust_pin,
            'phone'=>$this->cust_phone,
            'pcat'=>$this->p_cat,
            'goldLimit'=>$this->gold_limit,
            'cashLimit'=>$this->cash_limit,
            'markupValue'=>$this->markup_value,
            'shortName'=>$this->short_name,
            'orderInforced'=>$this->order_inforce,
            'billInforced'=>$this->bill_inforce,
            'lcDiscountPercentage'=>$this->lc_discount_percentage,
        );
    }
}
