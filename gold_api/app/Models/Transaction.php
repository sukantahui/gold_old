<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    /**
     * @var mixed
     */
    private $transaction_date;
    /**
     * @var mixed|string
     */
    private $transaction_number;
    /**
     * @var mixed
     */
    private $ledger_id;
    /**
     * @var mixed
     */
    private $asset_id;
    /**
     * @var mixed
     */
    private $voucher_number;
    /**
     * @var mixed
     */
    private $amount;
    /**
     * @var mixed
     */
    private $voucher_id;
    /**
     * @var mixed
     */
    private $particulars;
    /**
     * @var int|mixed
     */
    private $user_id;
    /**
     * @var mixed
     */
    private $id;
}
